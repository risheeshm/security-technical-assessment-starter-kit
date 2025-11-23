FROM node:22-alpine

WORKDIR /workspace/frontend

COPY package*.json ./

RUN npm install

COPY . .

# VULNERABILITY: Running as root (default)

CMD ["npm", "run", "dev", "--", "--host"]
