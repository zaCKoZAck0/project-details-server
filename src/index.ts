import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import {createUserController, uploadProjectsController, filterProjectsController} from './project/useCases'
import { Router } from 'express'
const router: Router = Router();

// url after "/api"
const app = new App(
  [
    router.get('/projects', (req, res)=>createUserController.execute(req, res)),
    router.post('/upload', (req, res)=>uploadProjectsController.execute(req, res)),
    router.get('/filter', (req, res)=>filterProjectsController.execute(req, res))
  ],
  8080,
);
 
app.listen();