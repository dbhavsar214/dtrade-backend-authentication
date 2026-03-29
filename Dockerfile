# ---------Build stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build
#--------Production

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/Index.js"]