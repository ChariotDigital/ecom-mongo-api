// we import express to add types to the request/response objects from our controller functions
import express from 'express';

import debug from 'debug';
import storeService from '../services/store.service';

const log: debug.IDebugger = debug('app:products-controller');

/**
  * Takes in request from the express server and calls the appropriate services to perform the CRUD
 *  actions associated with the request (GET, POST, PATCH, etc.). It then responds with the data
 *  requested or success/error messaging
 */

class StoreController {
    
    async listInventory(req: express.Request, res: express.Response) {
        const products = await storeService.list();
        res.status(200).send(products);
    }

}

export default new StoreController();