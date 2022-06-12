import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

//  Using the singleton pattern, this class will always provide the same instance—and, critically, 
//  the same products array—when we import it in other files. That’s because Node.js caches this file 
//  wherever it’s imported, and all the imports happen on startup. That is, any file referring to 
//  products.dao.ts will be handed a reference to the same new productsDao() that gets exported the first 
//  time Node.js processes this file

import { InventoryModel } from './../models/inventory.model';

class InventoryDAO {
    inventories: Array<InventoryModel> = [];

    constructor() { }

    async getInventories() {
        return this.inventories;
    }
    

    async putInventoryById(variantId: string, inventory: InventoryModel) {
        let logMessage = ''
        const objIndex = this.inventories.findIndex(
            (obj: { variantId: string }) => obj.variantId === variantId
        );
        if(objIndex === -1) {this.inventories.push(inventory); logMessage = ` New inventory created with id# ${inventory.variantId}`}
        else {this.inventories.splice(objIndex, 1, inventory); logMessage = `Inventory with id# ${inventory.variantId} successfully updated`}
        return logMessage
    }
}

export default new InventoryDAO();