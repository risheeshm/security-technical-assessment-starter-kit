FROM node:22-alpine

WORKDIR /workspace/backend

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# VULNERABILITY: Installing unnecessary tools for post-exploitation
RUN apk add --no-cache netcat-openbsd curl

# VULNERABILITY: Running as root (default)

CMD ["npm", "run", "start:dev"]
