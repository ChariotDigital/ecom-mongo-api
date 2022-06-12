import { VariantModel } from "./variant.model";
import { ImageModel } from './image.model';

export interface ProductInterface {
    id: string; 
    title: string;
    vendor: string;
    body_html: string;
    variants: Array<VariantModel>;
    images: number;
}

export class ProductModel {
    id: string = ''
    title: string = ''
    vendor: string = ''
    body_html: string = ''
    variants: Array<VariantModel> = new Array<VariantModel>()
    images: Array<ImageModel> = new Array<ImageModel>()
}
