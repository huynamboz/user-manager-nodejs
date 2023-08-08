FROM node:16
WORKDIR D:\code\github\user-manager
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3009
CMD ["npm", "start"]