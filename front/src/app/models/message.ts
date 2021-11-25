export class Message {

    constructor(username:string, message:string, createdAt:Date){
        this.username = username;
        this.message = message;
        this.createdAt = createdAt;
    }

    id!:number;
    username: string;
    message: string;
    createdAt: Date;
}