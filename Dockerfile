FROM node:slim
WORKDIR /docker/shl_asg/app
RUN apt-get install -y openssl
COPY package.json /docker/shl_asg/app
RUN npm i
COPY . /docker/shl_asg/app
RUN npx prisma generate
RUN npm run build
EXPOSE 8080
CMD node dist/src/index.js
