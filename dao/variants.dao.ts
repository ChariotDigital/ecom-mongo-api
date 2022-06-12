import debug from 'debug';
import { VariantModel } from '../models/variant.model';

const log: debug.IDebugger = debug('app:in-memory-dao');

//  Using the singleton pattern, this class will always provide the same instance—and, critically, 
//  the same variants array—when we import it in other files. That’s because Node.js caches this file 
//  wherever it’s imported, and all the imports happen on startup. That is, any file referring to 
//  variants.dao.ts will be handed a reference to the same new variantsDao() that gets exported the first 
//  time Node.js processes this file

class VariantsDAO {
    variants: Array<VariantModel> = [];

    constructor() {}

    async addVariant(product: VariantModel) {
        this.variants.push(product);
        return product.id;
    }


    async getVariants() {
        return this.variants;
    }
    

    async putVariantById(variantId: string, variant: VariantModel) {
        let logMessage = ''
        const objIndex = this.variants.findIndex(
            (obj: { id: string }) => obj.id === variantId
        );
        if(objIndex === -1) {this.variants.push(variant); logMessage = ` New product created with id# ${variant.id}`}
        else {this.variants.splice(objIndex, 1, variant); logMessage = `product with id# ${variant.id} successfully updated`}
        return logMessage
    }
}

export default new VariantsDAO();