import {CommonRoutesConfig} from '../common/common.routes';
import ProductsService from '../services/products.service'
import productsController from '../controllers/products.controller';
import express from 'express';

/**
 * Defines the Routes that will be exposed to users of this API. These Routes will set the ability to
 * maniuplate, add or remove data from the 'Products'. the routes supported are currently only read only
 * (bulk and individual product reading)
 */

export class ProductsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
        
    }

    configureRoutes(): express.Application {
        this.app.route(`/products`)
        .get( async (req: express.Request, res: express.Response) => {
            const list = await productsController.listProducts(req, res)
            res.status(200).send(list);
        })

    this.app.route(`/products/:productId`)
        .get( async (req: express.Request, res: express.Response) => {
            const product = await productsController.getproductById(req, res)
            res.status(200).send(product);
        })


    return this.app;
    }


}