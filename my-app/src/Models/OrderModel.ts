export class OrderModel{
    id:string;
    orderUserEmail:string;
    shopperAddress:string;
    orderedProducts:OrderModel[];

    constructor(id:string, orderUserEmail:string, shopperAddress:string, orderedProducts:OrderModel[]){
        this.id = id;
        this.orderUserEmail = orderUserEmail;
        this.shopperAddress = shopperAddress;
        this.orderedProducts = orderedProducts;
    }

}