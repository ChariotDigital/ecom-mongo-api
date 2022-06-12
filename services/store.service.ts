import { CRUD } from '../common/interfaces/crud.interface';
import { InventoryModel } from '../models/inventory.model';

import inventoryDao from '../dao/inventory.dao';

/**
 * Maninuplates the DAO for all models held within the 'store' database using a set of predefined 
 * CRUD actions
 */

class StoreService implements CRUD {
    
    // Returns an array of inventory objects for each variant
    async list() {
        return await inventoryDao.getInventories()
    }

    async readById(id: string) {
        throw Error('Not implemented')
    }
    
    async putById(id: string, resource: InventoryModel) {
        return inventoryDao.putInventoryById(id, resource)
    }
    
    async patchById(resourceId: any) {
        throw Error('Not implemented')
    };
    async create(resourceId: any) {
        throw Error('Not implemented')
    };
    async updateById(resourceId: any) {
        throw Error('Not implemented')
    };
    async deleteById(resourceId: any) {
        throw Error('Not implemented')
    };
}

export default new StoreService();