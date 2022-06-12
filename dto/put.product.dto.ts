import { VariantModel } from "../models/variant.model";
export interface PutProductDto {
    id: string; 
    title?: string;
    vendor?: string;
    body_html?: string;
    variants?: Array<VariantModel>;
    images?: number;
}