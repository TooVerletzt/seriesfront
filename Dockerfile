# Etapa 1: Build de Angular
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con Express
FROM node:18

WORKDIR /app

# Copiar lo necesario desde la etapa de build
COPY --from=build /app/dist/moviebook /app/dist/moviebook
COPY server.js /app/server.js
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 8080

CMD ["node", "server.js"]
