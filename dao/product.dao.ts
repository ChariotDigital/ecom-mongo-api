import { ProductModel } from '../models/product.model';
import debug from 'debug';
import mongooseService from '../common/services/mongoose.service';
import { VariantModel } from '../models/variant.model';
import shortid from 'shortid';
import { PutProductDto } from '../dto/put.product.dto';
import { PatchProductDto } from '../dto/patch.product.dto';
import { CreateProductDto } from '../dto/create.product.dto';
import { ImageModel } from '../models/image.model';

const log: debug.IDebugger = debug('app:in-memory-dao');

//  Using the singleton pattern, this class will always provide the same instance—and, critically, 
//  the same products array—when we import it in other files. That’s because Node.js caches this file 
//  wherever it’s imported, and all the imports happen on startup. That is, any file referring to 
//  products.dao.ts will be handed a reference to the same new productsDao() that gets exported the first 
//  time Node.js processes this file

class ProductsDAO {

    constructor() {}

    Schema = mongooseService.getMongoose().Schema;

    /**
     * Because Mongoose automatically makes an _id field available, we’ll remove the id field from the DTOs. 
     * It will come from the parameters from the route request anyway.
     * Beware that Mongoose models provide a virtual id getter by default, so we’ve disabled that option above 
     * with { id: false } to avoid confusion. But that broke our reference to 
     * user.id in our user middleware validateSameEmailBelongToSameUser()—we need user._id there instead.
     */

    productSchema = new this.Schema({
        _id: String,
        title: String,
        vendor: String,
        body_html: String,
        variants: Array<VariantModel>,
        images: Array<ImageModel>,
    }, { id: false });

    Product = mongooseService.getMongoose().model('{Prodcuts}', this.productSchema);

    async addProduct(productFields: CreateProductDto) {
        const product = new this.Product({
        _id: productFields.id? productFields.id : shortid.generate(),
        ...productFields,
        permissionFlags: 1,
    });
    await product.save();
    return product._id;
    }

    async getProducts(limit = 25, page = 0) {
        return this.Product.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getProductByEmail(email: string) {
        // using exec() for all mongoose calls becuase it provides better stack traces when debugging.
        return this.Product.findOne({ email: email }).exec(); 
    }
    
    async getProductById(productId: string) {
        return this.Product.findOne({ _id: productId }).populate('Product').exec();
    }
    

    async updateProductById(
        userId: string,
        userFields: PatchProductDto | PutProductDto
    ) {
        const existingProduct = await this.Product.findOneAndUpdate(
            { _id: userId },
            { $set: userFields },
            { new: true }
        ).exec();
    
        return existingProduct;
    }

    // async putProductById(productId: string, product: ProductModel) {
        
    //     let logMessage = ''
    //     const objIndex = this.products.findIndex(
    //         (obj: { id: string }) => obj.id === productId
    //     );
    //     if(objIndex === -1) {this.products.push(product); logMessage = ` New product created with id# ${product.id}`}
    //     else {this.products.splice(objIndex, 1, product); logMessage = `product with id# ${product.id} successfully updated`}
    //     return logMessage
    // }

    // async removeProductById(userId: string) {
    //     return this.Product.deleteOne({ _id: userId }).exec();
    // }
}

export default new ProductsDAO();