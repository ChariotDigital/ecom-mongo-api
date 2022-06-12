import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors'
import {CommonRoutesConfig} from './common/common.routes';
import debug from 'debug';
import { ProductsRoutes } from './routes/product.routes';
import { StoreRoutes } from './routes/store.routes';
import { ProductModel } from './models/product.model';
import axios, {Axios, AxiosResponse} from 'axios'
import productsController from './controllers/products.controller';
import { Error } from './models/error.model';
import { UsersRoutes } from './routes/users.routes.config';


const app: express.Application = express(); 
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const loadDatabaseFromOrigin = true;
  

app.use(bodyparser.json());
app.use(cors());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

// Add the routes for our Models to the router
routes.push(new ProductsRoutes(app));
routes.push(new StoreRoutes(app));
routes.push(new UsersRoutes(app))

// Spin up the logger

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

/**
 * Read in data from the provided url to the backend
 * @param url source of import data
 * @returns 
 */

async function loadProductsFromDB(url:string) {
    try {
    
      const dataLoadResposne = await axios.get<AxiosResponse>(
        url,
      ).then((response: AxiosResponse) => {
          response.data.forEach((productData: ProductModel) => {
            // Read in the Model specific values from the product data that is being imported
            const {id, title, vendor, body_html, variants, images} : ProductModel = productData
            productsController.putFromImport({id, title, vendor, body_html, variants, images}, response)

          })
          return response
      });
  
      debugLog('response from data import: ', dataLoadResposne.data);
  
      return dataLoadResposne;
    } catch (error) {
        return `Data import from ${url} has failed : ${error}`
      }

  }


app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`)
});
server.listen(port, async () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    if(loadDatabaseFromOrigin){
        const dataImportresponse = await loadProductsFromDB('https://my-json-server.typicode.com/convictional/engineering-interview-api/products')
        return dataImportresponse
    } 
});