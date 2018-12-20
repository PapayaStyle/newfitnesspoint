export class RestResponse {
  public status: number;
  public statusText: string;
  public message: string;

  constructor(obj?: any) {
    if (typeof obj == 'object') {
      obj.status && (this.status = obj.status);
      obj.message && (this.message = obj.message);
    }
  }
}