import { ChatRoom } from "./chatRoom";

export class Message {

    constructor(authorId:number, message:string, createdAt:Date, chatRoomId: number){
        this.authorId = authorId;
        this.message = message;
        this.createdAt = createdAt;
        this.chatRoomId = chatRoomId;
    }

    id!:number;
    authorId: number;
    message: string;
    createdAt: Date;
    chatRoomId: number;
}