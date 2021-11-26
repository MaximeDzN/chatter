import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ServerConfig } from "../config/server.config";
import jwt_decode from 'jwt-decode';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { TokenRequest } from "../models/tokenRequest";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient,
        private serverConfig: ServerConfig,
        private router: Router
    ) { }

    private API_URL = this.serverConfig.API_URL + "/Auth";

    signin(login: any): Observable<TokenRequest> {
        return this.http.post<TokenRequest>(`${this.API_URL}/signin`, login);
    }


    isAuth(): boolean {
        if (this.getToken())
            return true;
        else
            return false;
    }


    getDecodedToken(): any {
        try {
            return jwt_decode<any>(this.getToken() || '');
        } catch (error:any) {
            
            throw Error(error.message);
        }
    }

    decodedTokenToUser(): User {
        let decode = this.getDecodedToken();
        return new User(decode.id,decode.sub,decode.role,decode.enabled,decode.createdAt);
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }


    logout(): void {
        localStorage.removeItem("token");
        window.location.reload();
    }


}
