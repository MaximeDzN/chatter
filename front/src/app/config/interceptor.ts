import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";




const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
        ) { }

        url: string = "chatter/api/Auth";
        
        private handleAuthError(err: HttpErrorResponse): Observable<any> {
            return throwError(() => new Error(err.message));
        }

    intercept(req: HttpRequest<any>, next: HttpHandler){  
        let authReq = req;

        let token = null;
        token = localStorage.getItem("token");
        if(token != null && !authReq.url.includes(`${this.url}/signin`) && !authReq.url.includes(`${this.url}/signup`)){
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
    }

}