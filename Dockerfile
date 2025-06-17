# Etapa 1: Build de Angular
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servidor Express
FROM node:18

WORKDIR /app

# Copia solo lo necesario
COPY --from=build /app/dist/moviebook /app/dist/moviebook
COPY server.js ./
COPY package*.json ./

# IMPORTANTE: Usa express@4 para evitar el bug
RUN npm install express@4

EXPOSE 8080
CMD ["node", "server.js"]
