FROM node:16
WORKDIR /benode/backend
COPY package*.json ./
RUN npm install
RUN npx knex migrate:latest
COPY . .
EXPOSE 3009
CMD ["npm", "start"]