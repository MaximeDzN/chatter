import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class ServerConfig {
  
  
    public API_URL = "http://localhost:5000/chatter/api";
  
  }