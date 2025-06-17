# Etapa 1: Build de Angular
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Etapa 2: Servidor Express
FROM node:18
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
COPY package*.json ./
RUN npm install --omit=dev
EXPOSE 8080
CMD ["node", "server.js"]""
#volveremos#