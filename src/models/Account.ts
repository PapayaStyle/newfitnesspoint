export class Account {
    public token: string;
    public username: string;
    public password: string;

    constructor(username: string, password: string, token?: string) {
        this.username = username;
        this.password = password;
        this.token = token;
    }
 }