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
    public messages: Message[] = [];
    token: string = this.authService.getToken() || '';
    private stompClient: Client

    constructor(private serverConfig: ServerConfig, private authService: AuthService) {
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


        this.stompClient.onConnect = (frame) => {
            this.stompClient.subscribe("/message",(message)=> {
                console.log(JSON.parse(message.body));
                this.messages.push(JSON.parse(message.body));
            });
        }


        this.stompClient.webSocketFactory = function () {
            return new SockJS(`${API_URL}?token=${token}`) as any;
        }


        this.stompClient.onStompError = (frame) => {
            console.log(frame);
        }
        this.stompClient.activate();
    }



    sendMessage(message: Message): void{ 
        console.log(message);
        try {
            this.stompClient.publish({
                destination:'/app/send/message',
                body:  JSON.stringify(message),
            });

        } catch(error){
            console.log(error);
        }
        

    }




}