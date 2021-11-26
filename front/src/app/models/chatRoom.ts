import { Message } from "./message";

export class ChatRoom {


    constructor(id:number,userA:number,userB:number,messages:Message[]){
        this.id = id;
        this.userA = userA;
        this.userB = userB;
        this.messages = messages;
    }

    id:number;
    userA:number;
    userB:number;
    messages:Message[];

}