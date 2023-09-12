FROM node:16
WORKDIR /benode/backend
COPY package*.json ./
RUN npm install
RUN npm install knex -g
RUN npx knex migrate:latest
COPY . .
EXPOSE 3009
CMD ["npm", "start"]