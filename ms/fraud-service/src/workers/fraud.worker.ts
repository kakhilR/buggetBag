// src/workers/fraud.worker.ts
import Transaction from "../models/transaction.model";

type Edge = { to: string; txnId: string; amount: number; createdAt: Date };

interface GraphAdj {
  [fromUserId: string]: Edge[];
}


export async function detectCyclesAndFlag(options: {
  windowHours?: number;    // how far back to look
  maxLen?: number;         // max nodes in cycle
  minAmount?: number;      // optional minimum txn amount to consider
}) {
  const { windowHours = 24, maxLen = 4, minAmount = 0 } = options;

  const since = new Date(Date.now() - windowHours * 60 * 60 * 1000);

  // 1. fetch recent successful transactions
  const edgesRaw = await Transaction.find({
    createdAt: { $gte: since },
    status: "SUCCESS",
    amount: { $gte: minAmount }
  }, { fromUserId: 1, toUserId: 1, txnId: 1, amount: 1, createdAt: 1 }).lean();

  // 2. build adjacency map with txn metadata
  const adj: GraphAdj = {};
  for (const e of edgesRaw) {
    if (!adj[e.fromUserId]) adj[e.fromUserId] = [];
    adj[e.fromUserId].push({
      to: e.toUserId,
      txnId: e.txnId,
      amount: e.amount,
      createdAt: e.createdAt
    });
  }

  // helper: canonicalize cycle (rotate to smallest string) to dedupe
  const canonize = (arr: string[]) => {
    const rotations = arr.map((_, i) => arr.slice(i).concat(arr.slice(0, i)));
    rotations.sort();
    return rotations[0].join("->");
  };

  const foundCycles = new Map<string, { nodes: string[]; txnIds: string[] }>();

  // DFS bounded search from each node
  const nodes = Object.keys(adj);
  for (const start of nodes) {
    const stackNodes: string[] = [];
    const stackEdges: Edge[] = [];
    const visited = new Set<string>();

    function dfs(curr: string, depth: number) {
      if (depth > maxLen) return;
      if (!adj[curr]) return;

      for (const edge of adj[curr]) {
        const next = edge.to;

        // if next equals start and we have at least 2 nodes, cycle found
        if (next === start && stackNodes.length + 1 >= 2) {
          const cycleNodes = [...stackNodes, curr, next];
          // map nodes to txnIds in path order
          const txnIds = [...stackEdges.map(e => e.txnId), edge.txnId];
          const key = canonize(cycleNodes);
          if (!foundCycles.has(key)) {
            foundCycles.set(key, { nodes: cycleNodes, txnIds });
          }
        } else {
          // avoid immediate back-edge duplicates: allow revisiting nodes in a different path
          if (stackNodes.includes(next)) continue;
          // push
          stackNodes.push(curr);
          stackEdges.push(edge);
          dfs(next, depth + 1);
          stackNodes.pop();
          stackEdges.pop();
        }
      }
    }

    dfs(start, 1);
  }

  // 3. For each cycle found, compute risk and update transactions
  const updates: { txnId: string; update: any }[] = [];
  for (const [key, { nodes, txnIds }] of foundCycles.entries()) {
    // small heuristic: shorter cycles are more suspicious
    const cycleLen = nodes.length;
    const baseRisk = Math.min(80, (5 - cycleLen) * 20 + 40); // len=2->80, len=3->60, len=4->40 etc
    const updatesForThis = txnIds.map(txnId => ({
      txnId,
      update: {
        $set: {
          flagged: true
        },
        $addToSet: {
          flagReasons: "cycle"
        },
        $max: {
          riskScore: baseRisk
        }
      }
    }));
    updates.push(...updatesForThis);
  }

  // apply updates in bulk
  const bulkOps = updates.map(u => ({
    updateOne: {
      filter: { txnId: u.txnId },
      update: u.update
    }
  }));
  if (bulkOps.length) {
    const res = await Transaction.collection.bulkWrite(bulkOps, { ordered: false });
    return { cycles: foundCycles.size, updated: res.modifiedCount ?? 0 };
  } else {
    return { cycles: 0, updated: 0 };
  }
}
