import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from './shared';
import { Account } from '../models/account';
import { Response } from '@angular/http';
import { RestResponse } from '../models/RestResponse';
import { RequestObj } from '../models/RequestObj';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BaseService {

  protected LOCAL_URL = 'http://localhost/request/';
  protected SERVER_URL = 'http://www.new-fitnesspoint.it/request/';

  protected BASE_URL;
  protected HEADERS: HttpHeaders;
  protected params: URLSearchParams;

  constructor(protected httpClient: HttpClient,
    protected cookie: CookieService,
    protected share: SharedService,
    protected toastr: ToastrService) {
    this.setHeaders();
    this.setRestUrl();
  }

  protected setHeaders() {
    this.HEADERS = new HttpHeaders();

    let curr_url: string = window.location.href;
    let port: string = window.document.location.port;
    let protocol: string = window.document.location.protocol;

    console.log('Current: ' + curr_url);
    if (curr_url.includes('localhost')) {
      this.HEADERS.set('Content-Type', 'application/json');
    } else if (curr_url.includes('new-fitnesspoint')) {
      this.HEADERS.set('Content-Type', 'application/json');
      this.HEADERS.set('Access-Control-Allow-Origin', '*');
      this.HEADERS.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      this.HEADERS.set('Access-Control-Allow-Headers', 'Authorization');
    }
  }

  protected setRestUrl() {
    let curr_url: string = window.location.href;
    let port: string = window.document.location.port;
    let protocol: string = window.document.location.protocol;

    console.log('Current: ' + curr_url);
    if (curr_url.includes('localhost')) {
      this.BASE_URL = this.LOCAL_URL;
    } else if (curr_url.includes('new-fitnesspoint')) {
      this.BASE_URL = this.SERVER_URL;
    }
  }

  protected setCookieToken(account: Account) {
    console.log(account.token);
    this.cookie.set('token', account.token, 1);
    this.cookie.set('account', account.username, 1);
  }

  protected handleError(err: Response): Promise<any> {
    console.log(err);

    if (err.json().message != null) {
      console.log(err.json());
      err.status = err.json().status;
      err.statusText = err.json().message;
    } else if (err.status == 0 || err.status == null || err.status == undefined) {
      console.log(err.status);
      err.status = 500;
      err.statusText = 'Generic Error';
    }
    let error = new RestResponse(err);

    this.share.changeLoading(false);

    this.toastr.error(error.message);

    return Promise.reject(error);
  }

  protected async GET(requestObj: RequestObj): Promise<Object> {
    if (requestObj && requestObj.resource != null) {
      let currentUrl = `${this.BASE_URL}${requestObj.resource}`;
      console.log(`GET-currentUrl: ${currentUrl}`);
      let headers = this.HEADERS;
      const params = Object.getOwnPropertyNames(requestObj.params)
        .reduce((p, key) => p.set(key, requestObj.params[key]), new HttpParams());
      let options = { headers: headers, params: params };
      return this.httpClient
        .get(currentUrl, options)
        .toPromise()
        .then(data => {
          this.share.changeLoading(false);
          return data;
        })
        .catch(this.handleError);
    } else {
      return Promise.reject('missing params');
    }
  }

  protected async POST(requestObj: RequestObj, secondParam?): Promise<any> {
    if (!secondParam)
      secondParam = {};

    if (requestObj && requestObj.resource != null) {
      let currentUrl = `${this.BASE_URL}${requestObj.resource}`;
      console.log(`POST-currentUrl: ${currentUrl}`);
      let options = { headers: this.HEADERS };
      return this.httpClient
        .post(currentUrl,
          Object.keys(requestObj.params).length == 0 ? secondParam : requestObj.params,
          options)
        .toPromise()
        .then(data => {
          this.share.changeLoading(false);
          return data;
        })
        .catch(this.handleError);
    } else {
      return Promise.reject('missing params');
    }
  }

  async PUT(requestObj: RequestObj): Promise<Object> {
    if (requestObj && requestObj.resource != null) {
      let currentUrl = `${this.BASE_URL}${requestObj.resource}`;
      console.log(`PUT-currentUrl: ${currentUrl}`);
      let options = { headers: this.HEADERS };
      return this.httpClient
        .put(currentUrl, requestObj.params, options)
        .toPromise()
        .then(data => {
          this.share.changeLoading(false);
          return data;
        })
        .catch(this.handleError);
    } else {
      return Promise.reject('missing params');
    }
  }

}