FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production || npm install --omit=dev

# copy everything and install dev deps only if you need them (for dev)
COPY . .

ENV NODE_ENV=production

# Build TypeScript -> JavaScript
RUN npm run build

EXPOSE 8002

CMD ["node", "dist/server.js"]
# If you use ts-node for dev in container, replace with:
# CMD ["npm", "run", "dev"]
