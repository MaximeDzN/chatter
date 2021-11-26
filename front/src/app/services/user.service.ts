import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ServerConfig } from "../config/server.config";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient,
        private serverConfig: ServerConfig,
        private router: Router
    ) { }

    private API_URL = this.serverConfig.API_URL + "/User";


    findAllExceptUser(id: number): Observable<User[]> {
        return this.http.get<User[]>(`${this.API_URL}/findAllExceptUser/${id}`);
    }




}