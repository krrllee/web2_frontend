import { ProductModel } from "./ProductModel";

export class OrderModel{
    id:string;
    orderUserEmail:string;
    shopperAddress:string;
    orderedProducts:ProductModel[];
    orderStatus: number = 0;
    endTime: Date;
    constructor(id:string, orderUserEmail:string, shopperAddress:string, orderedProducts:ProductModel[], endTime:Date){
        this.id = id;
        this.orderUserEmail = orderUserEmail;
        this.shopperAddress = shopperAddress;
        this.orderedProducts = orderedProducts;
        this.endTime = endTime;
    }

}