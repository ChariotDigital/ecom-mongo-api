import {CommonRoutesConfig} from '../common/common.routes';
import express from 'express';
import storeController from '../controllers/store.controller';

/**
 * Defines the Routes that will be exposed to users of this API. These Routes will set the ability to
 * maniuplate, add or remove data from the 'Store'. The store currently supportt he ability to query for 
 * 'InventoryModel' Objects
 */

export class StoreRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'StoreRoutes');
    }


    configureRoutes(): express.Application {
        this.app.route(`/store/inventory`)
        .get( async (req: express.Request, res: express.Response) => {
            const inventory = await storeController.listInventory(req,res)
            res.status(200).send(inventory)
        })

        
    return this.app;
    }


}