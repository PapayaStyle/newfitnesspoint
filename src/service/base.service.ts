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

  protected httpClient: HttpClient;
  protected cookie: CookieService;
  protected share: SharedService;
  protected toastr: ToastrService;

  constructor(httpClient: HttpClient,
    cookie: CookieService,
    share: SharedService,
    toastr: ToastrService) {

    this.httpClient = httpClient;
    this.cookie = cookie;
    this.share = share;
    this.toastr = toastr;

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

  private handleError(err: any, _service:BaseService): Promise<any> {
    console.log('handleError');
    let error: RestResponse;
    
    if (err.error.status) {
      error = new RestResponse({
        status: err.error.status,
        statusText: err.error.statusText,
        message: err.error.message
      });
    } else if (err.status) {
      error = new RestResponse({
        status: err.status,
        statusText: err.message,
        message: err.message
      });
    } else {
      error = new RestResponse({ status: 'KO', message: 'Generic Error' });
    }
    
    _service.share.changeLoading(false);

    _service.toastr.error(error.message);

    console.log(err);
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
        .catch( err => this.handleError(err, this));
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
        .catch( err => this.handleError(err, this));
    } else {
      return Promise.reject('missing params');
    }
  }

  protected async PUT(requestObj: RequestObj): Promise<Object> {
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
        .catch( err => this.handleError(err, this));
    } else {
      return Promise.reject('missing params');
    }
  }

}