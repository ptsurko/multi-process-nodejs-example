FROM node

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json ./package.json
RUN npm install --g nodemon forever

RUN npm install

# Add source files
COPY . .

RUN chmod +x ./scripts/entrypoint.sh

CMD ["./scripts/entrypoint.sh", "index.js"]
