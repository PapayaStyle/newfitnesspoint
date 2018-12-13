export class Account {
  public token: string;
  public username: string;
  public password: string;

  constructor(obj?: any) {
    if(typeof obj == 'object') {
      obj.token && (this.token = obj.token);
      obj.username && (this.username = obj.username);
      obj.password && (this.password = obj.password);
    }
  }
 }