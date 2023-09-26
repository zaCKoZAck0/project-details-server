FROM node:slim
WORKDIR /docker/shl_asg/app
COPY package.json /docker/shl_asg/app
RUN apt-get update -y && apt-get install -y openssl
RUN npm i
COPY . /docker/shl_asg/app
RUN prisma generate
RUN npm run build
EXPOSE 8080
CMD node dist/src/index.js