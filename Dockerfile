# Etapa 1: Build de Angular
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

# Etapa 2: Servir con Express
FROM node:18

WORKDIR /app

# Copiar build final
COPY --from=build /app/dist/moviebook/browser /app/dist/moviebook/browser
COPY server.js /app/server.js
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 8080

CMD ["node", "server.js"]
