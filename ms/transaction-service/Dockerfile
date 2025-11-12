FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production || npm install --omit=dev

COPY . .

ENV NODE_ENV=production

# Build TypeScript -> JavaScript
RUN npm run build

EXPOSE 8003

CMD ["node", "dist/server.js"]
# or use ts-node in dev: CMD ["npm", "run", "dev"]
