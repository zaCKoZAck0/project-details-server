FROM node:slim
WORKDIR /docker/shl_asg/app
COPY . /docker/shl_asg/app
RUN npm i
EXPOSE 8080
CMD node src/index.js
