FROM node:12.16
WORKDIR /app
COPY ./package.json ./
RUN npm i --silent --quiet
COPY . .
RUN npm run build
CMD ["ls", "build"]