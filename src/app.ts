
import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Router } from 'express'
import cors from 'cors'
import upload from "express-fileupload";

class App {
  public app: express.Application;
  public port: number;
 
  constructor(routers: Router[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRouters(routers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    // in latest body-parser use like below.
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(upload())
    this.app.use(cors())
  }
 
  private initializeRouters(routers: Router[]) {
    routers.forEach((router) => {
      this.app.use('/api', router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;