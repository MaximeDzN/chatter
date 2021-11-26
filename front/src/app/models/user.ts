export class User {

    constructor(id:number,username:string,role:string,enabled:boolean,createdAt:Date){
        this.id = id;
        this.username = username;
        this.role = role;
        this.enabled = enabled;
        this.createdAt = createdAt;
    }

    id: number;
    username: string;
    role: string;
    enabled: boolean;
    createdAt: Date;
}