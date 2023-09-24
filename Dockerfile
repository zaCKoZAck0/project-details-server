FROM node:slim
WORKDIR /docker/shl_asg/app
COPY . /docker/shl_asg/app
RUN npm i && npm run build
EXPOSE 8080
CMD node dist/src/index.js
