import ProductsDAO from '../dao/product.dao';
import { CRUD } from '../common/interfaces/crud.interface';
import { ProductModel } from '../models/product.model';
import { limits } from 'argon2';
import { PutProductDto } from './../dto/put.product.dto';
import { PatchProductDto } from './../dto/patch.product.dto';
import { CreateProductDto } from './../dto/create.product.dto';

/**
 * Maninuplates the DAO for all models held within the 'products' database using a set of predefined 
 * CRUD actions
 * 
 * 
 * The main structure here is a fairly robust pattern. For instance, it can be reused if developers 
 * want to swap Mongoose and MongoDB for something like TypeORM and PostgreSQL. As above, such a 
 * replacement would simply require refactoring 
 * the individual functions of the DAO while maintaining their signatures to match the rest of the code.
 */


class ProductsService implements CRUD {
    async list(limit: number, page: number) {
        return ProductsDAO.getProducts(limit, page);
    }
    
    async readById(id: string) {
        return ProductsDAO.getProductById(id);
    }
    
    async putById(id: string, resource: PutProductDto) {
        return ProductsDAO.updateProductById(id, resource);
    }
    async patchById(id: string, resource:PatchProductDto) {
        return ProductsDAO.updateProductById(id, resource);
    };
    async create( resource: CreateProductDto) {
        return ProductsDAO.addProduct(resource)
    };
    async updateById(resourceId: any) {
        throw Error('Not implemented')
    };
    async deleteById(resourceId: any) {
        throw Error('Not implemented')
    };
}

export default new ProductsService();