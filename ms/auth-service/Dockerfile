FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY . .

ENV NODE_ENV=production

# Build TypeScript -> JavaScript
RUN npm run build

EXPOSE 8001

CMD ["node", "dist/server.js"]
# or for dev: CMD ["npm","run","dev"]
