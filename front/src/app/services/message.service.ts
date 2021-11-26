import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

import { ServerConfig } from "../config/server.config";
import { Message } from "../models/message";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    API_URL = `${this.serverConfig.API_URL}/socket`;
    API_URL_2 = `${this.serverConfig.API_URL}/Message`;
    public messages: Message[] = [];
    token: string = this.authService.getToken() || '';
    private stompClient: Client;
    room!:number;

    constructor(private serverConfig: ServerConfig, private authService: AuthService, private http:HttpClient) {
        const API_URL = `${this.API_URL}`;
        const token = this.token;

        this.stompClient = new Client({
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.stompClient.webSocketFactory = function () {
            return new SockJS(`${API_URL}?token=${token}`) as any;
        }

        this.stompClient.onConnect = (frame) => {
            this.stompClient.subscribe("/message/"+this.room,(message)=> {
                this.messages.push(JSON.parse(message.body));
            });
        }


        this.stompClient.onStompError = (frame) => {
            console.log(frame);
        }
        
    }


    connect(room:number){
        this.room = room;
        this.stompClient.activate();
    }

    disconnect(){
        this.stompClient.deactivate();
    }

    sendMessage(message: Message): void{ 
        try {
            this.stompClient.publish({
                destination:'/app/send/message/'+message.chatRoomId,
                body:  JSON.stringify(message),
            });

        } catch(error){
            console.log(error);
        }
    }

    findAll(){
        this.http.get<Message[]>(`${this.API_URL_2}/findAll`).subscribe({
            next: (messages) => {
                 this.messages =messages.sort((a,b) => a.id - b.id);
              },
        });
    }


}