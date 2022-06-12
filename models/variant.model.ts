import { ImageModel } from "./image.model"
import { WeightModel } from "./weight.model"

export interface VariantModel {
    id:string
    title:string
    product_id: string
    sku:string
    available:boolean // description: True if inventory > 0, false otherwise
    inventory_quantity: number // description: Inventory for given variant. Should be 0 if no information provided
    weight: WeightModel | any

    // Properties used for the spcific import data given
    weight_unit?: string
    weight_amount?:number
    images?:any
}
