export class UserDataModel{
    name: string;
    lastname: string;
    address: string;
    email : string;
    dateOfBirth : Date;
    username : string;
    userVerified: boolean;
    constructor(name:string, lastname:string, address:string, email:string, dateOfBirth:Date, username:string, userVerified:boolean){
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.userVerified = userVerified;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.username = username;
    }
}