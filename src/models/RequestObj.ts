export class RequestObj {
  resource : string;
  params : Object;

  constructor(resource: string, params: Object) {
    this.resource = resource;
    this.params = params;
  }

}