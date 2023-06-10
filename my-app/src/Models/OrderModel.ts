import { ProductModel } from "./ProductModel";

export class OrderModel{
    id:string;
    orderUserEmail:string;
    shopperAddress:string;
    orderedProducts:ProductModel[];
    orderStatus: number = 0;
    constructor(id:string, orderUserEmail:string, shopperAddress:string, orderedProducts:ProductModel[]){
        this.id = id;
        this.orderUserEmail = orderUserEmail;
        this.shopperAddress = shopperAddress;
        this.orderedProducts = orderedProducts;
    }

}