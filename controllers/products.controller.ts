
import express from 'express';

import ProductsService from '../services/products.service';
import VariantsService from '../services/variants.service';
import storeService from '../services/store.service';

import debug from 'debug';
import { ProductModel } from '../models/product.model';
import { AxiosResponse } from 'axios';
import { InventoryModel } from '../models/inventory.model';
import { VariantModel } from '../models/variant.model';
import { ImageModel } from '../models/image.model';
import { Error } from '../models/error.model';
const log: debug.IDebugger = debug('app:products-controller');

/**
 * Takes in request from the express server and calls the appropriate services to perform the CRUD
 * actiosn associated with the request (GET, POST, PATCH, etc.). It then responds with the data
 *  requested or success/error messaging
 */

class ProductsController {
    async listProducts(req: express.Request, res: express.Response) {
        const products = await ProductsService.list(100,0 );
        res.status(200).send(products);
    }

    async getproductById(req: express.Request, res: express.Response) {
        if(!req.params.productId) {
            res.status(400).send(new Error(`Inavlid ID supplied`));
            return;
        }
        const product = await ProductsService.readById(req.params.productId);
        if(product){
            res.status(200).send(product);
        } else {
            res.status(404).send(new Error(`Product with id ${req.params.productId} not found`));
        }
    }

    /**
     * Add a product that is coming in from an import to the database. This method will also add all the 
     * component parts of a product to the data base, i.e. its varaiants and images
     * 
     * @param product Product to be added to the database
     * @param res Express response for this PUT action
     */
    async putFromImport(product:ProductModel, res: AxiosResponse) {
        // Since the data being imported most likely isnt in the style of our schema, we have to extract
        // the data we need and trasnform it to fit our needs.
        try {

            const variantModels : Array<VariantModel> = new Array<VariantModel>()
            const imageModels : Array<ImageModel> = new Array<ImageModel>()
            for(const productVariant of product.variants) {
                const {id, title, product_id, sku, available, inventory_quantity, weight_unit, images} : VariantModel = productVariant
                
                const weight : any = {value: productVariant['weight'],unit: productVariant['weight_unit'] }
                
                 // Transform image data and add it to the list so we can associate it with its product later
                if(images) {
                    for(const image of images) {
                        imageModels.push({source: image.src, variantId:productVariant.id})
                    }
                }
                await VariantsService.putById(
                    productVariant.id, 
                    {id, title, product_id, sku, available, inventory_quantity, weight, weight_unit}
                )
                
                // Add the newly made variant to the list so we can associate it with its product later
                variantModels.push({id, title, product_id, sku, available, inventory_quantity, weight})
                
                const inventoryObj : InventoryModel = {variantId:productVariant.id, productId:productVariant.product_id, stock: 0}
                await storeService.putById(inventoryObj.variantId, inventoryObj )
            }
            product.variants = variantModels
            product.images = imageModels
            log(await ProductsService.create(product));
            
            res.status = 200 
            res.data = `Products Successfully imported!`
        } catch(error) {
            log(`Error Occurred Importing products in controller: ${error}`)
            throw error
        }

    }

}

export default new ProductsController();