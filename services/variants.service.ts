import variantsDao from '../dao/variants.dao';
import { CRUD } from '../common/interfaces/crud.interface';
import { VariantModel } from '../models/variant.model';

/**
 * Maninuplates the DAO for all models held within the 'variants' database using a set of predefined 
 * CRUD actions
 */

class VariantsService implements CRUD {

    
    async list() {
        return variantsDao.getVariants();
    }
    
    async readById(id: string) {
        throw Error('Not implemented')
    }
    
    async putById(id: string, resource: VariantModel) {
        return variantsDao.putVariantById(id, resource);
    }
    
    async patchById(resourceId: any) {
        throw Error('Not implemented')
    };
    async create(resourceId: any) {
       
    };
    async updateById(resourceId: any) {
        throw Error('Not implemented')
    };
    async deleteById(resourceId: any) {
        throw Error('Not implemented')
    };
}

export default new VariantsService();