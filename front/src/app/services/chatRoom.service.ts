import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ServerConfig } from "../config/server.config";
import { ChatRoom } from "../models/chatRoom";

@Injectable({
    providedIn: 'root'
})

export class ChatRoomService {


    constructor(
        private http: HttpClient,
        private serverConfig: ServerConfig,
        private router: Router
    ) { }

    private API_URL = this.serverConfig.API_URL + "/ChatRoom";

    findByUsers(userA:number,userB:number): Observable<ChatRoom>{
       return this.http.get<ChatRoom>(`${this.API_URL}/findByUsers/${userA}/${userB}`);
    }


}