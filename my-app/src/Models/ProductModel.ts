export class ProductModel{
    id:string;
    name: string;
    merchantId:string;
    description:string;
    price:number;
    quantity:number;
    imageUrl:string;
    constructor(name:string, id:string, merchantId:string, description:string, price:number, quantity:number, imageUrl:string){
        this.name = name;
        this.id = id;
        this.merchantId = merchantId;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }
}