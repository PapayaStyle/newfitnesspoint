import { Injectable, OnInit } from '@angular/core';
import { 
    Http, URLSearchParams, Headers, 
    Response, ResponseContentType, ResponseType, RequestOptions 
} from '@angular/http';
import { Observable, Subscriber } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../models/account';
import { Error } from '../models/Error';
import { SharedService } from './shared';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ServicePHP {

    private LOCAL_URL =  'http://localhost/request/';
    private SERVER_URL =  'http://www.new-fitnesspoint.it/request/';

    private BASE_URL;
    private HEADERS: Headers;

    public url: string;
    public params: URLSearchParams;

    private RESPONSE = ResponseContentType.Json;

    constructor(private http: Http, 
        private httpClient: HttpClient,
        private cookie: CookieService,
        private share: SharedService ) { 
        this.setHeaders();
        this.setRestUrl();
    }

    setHeaders() {
        this.HEADERS = new Headers();

        let curr_url: string = window.location.href; 
        let port:string = window.document.location.port;
        let protocol:string = window.document.location.protocol;

        console.log('Current: ' + curr_url);
        if ( curr_url.includes('localhost') ) {
            this.HEADERS.set('Content-Type', 'application/json');
            //this.HEADERS.set('Access-Control-Allow-Headers', 'Authorization');
            //this.HEADERS.set('Authorization', ' ');
        } else if ( curr_url.includes('new-fitnesspoint') ) {
            this.HEADERS.set('Content-Type', 'application/json');
            this.HEADERS.set('Access-Control-Allow-Origin', '*');
            this.HEADERS.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
           // this.HEADERS.set('Authorization', ' ');
            this.HEADERS.set('Access-Control-Allow-Headers', 'Authorization');      
        }
        
        /*
        this.HEADERS.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.HEADERS.append('Access-Control-Allow-Origin','*');
        this.HEADERS.append('Access-Control-Allow-Methods','GET, POST, OPTIONS');
        this.HEADERS.append('Access-Control-Allow-Headers', '*');
        */
        //this.HEADERS.append('Authorization', ' ');
        //this.HEADERS.append('Access-Control-Allow-Headers', 'Authorization');
    }

    setRestUrl() {
        //console.log('setRestUrl()');
        //console.log('Local: '+ localUrl);
        //console.log('Server: '+ serverUrl);

        let curr_url: string = window.location.href; 
        let port:string = window.document.location.port;
        let protocol:string = window.document.location.protocol;

        console.log('Current: ' + curr_url);
        if ( curr_url.includes('localhost') ) {
            this.BASE_URL = this.LOCAL_URL;
        } else if ( curr_url.includes('new-fitnesspoint') ) {
            this.BASE_URL = this.SERVER_URL;                
        }
        
    }

    handleError(err: Response): Promise<any> {
        console.log(err);

        if(err.json().message != null) {
            console.log(err.json());
            err.status = err.json().status;
            err.statusText = err.json().message;
        } else if (err.status == 0 || err.status == null || err.status == undefined) {
            console.log(err.status);
            err.status = 500;
            err.statusText = 'Generic Error';
        }
        let error: Error = new Error (err.status, err.statusText);
        
        this.share.changeLoading(false);
        return Promise.reject(error);
    }

    /**
     * call php service to do login
     * @param username 
     * @param password 
     */
    login(account: Account): Promise<Error|Account> {
        //console.log(this.HEADERS.values());

        this.url = this.BASE_URL + 'login.php';


        const body = JSON.stringify(account);
        console.log(body);
        /*
        let params = new URLSearchParams();
        params.append('username', account.username);
        params.append('password', account.password);
        */

        return this.http.post(this.url, body,
            { headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.setCookieToken(res.json() as Account);
                return res;
            })
            .catch( err => this.handleError(err) );
    }

    setCookieToken(account: Account) {
        console.log(account.token);
        this.cookie.set('token', account.token, 1);
        this.cookie.set('account', account.username, 1);
    }

    /**
     * call php service to check authentication
     */
    auth(): Promise<Error|boolean> {
        this.share.changeLoading(true);
        console.log('auth()');

        console.log(this.HEADERS.has('Authorization'));
        if(!this.HEADERS.has('Authorization'))
            this.HEADERS.append('Authorization', this.cookie.get('token'));
        
        
        let headers = new HttpHeaders();
        headers.set('Authorization', this.cookie.get('token'));
        
        //let response = ResponseContentType.Json;
        console.log(this.HEADERS);

        this.url = this.BASE_URL + 'auth.php';

        return this.httpClient.post(this.url, '', {
            headers: headers, responseType: 'json'})
            .toPromise()
            .then( res => {
                console.log(res);
                this.share.changeLoading(false);
                if(res)
                    return true;
                else
                    return false;
            });
        /*
        return this.http.post(this.url,
            {  headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res);
                this.share.changeLoading(false);
                return res;
            })
            .catch( err => 
                this.handleError(err) );
        */
    }

    /**
     * destroy authentication token 
     */
    logout() {
        this.cookie.deleteAll();
        //console.log(this.cookie.getAll());
        this.HEADERS.delete('Authorization');
    }

    /**
     * call php service to get Calendar
     */
    getCalendar() {
        this.url = this.BASE_URL + 'calendar_query.php';

        //let response = ResponseContentType.Json;

        return this.http.get(this.url,
            { headers: this.HEADERS, responseType: this.RESPONSE })
        //return this.http.get(this.url)
            .toPromise()
            .then( res => {
                return res.json().courses;
            })
            .catch( err => 
                this.handleError(err) 
            );
    }

     /**
     * call php service to save Calendar
     */
    saveCalendar(model): Promise<Error|string> {
        this.share.changeLoading(true);

        //let response = ResponseContentType.Json;

        this.url = this.BASE_URL + 'save_calendar.php';
        const body = 'data=' + JSON.stringify(model);
        
        return this.http.post(this.url, body,
            { headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().status;
            })
            .catch( err => 
                this.handleError(err) );
    }

    /**
     * call php service to get Activities
     */
    getActivities(req: string) {
        this.share.changeLoading(true);

        //let response = ResponseContentType.Json;

        this.url = this.BASE_URL + 'activity_query.php';

        /*
        const body = new FormData();
        body.append('data', JSON.stringify({
            req: req
        }));
        */
        let params = new URLSearchParams();
        params.append('req', req);
        //const headers =  new Headers();
        //headers.set('Content-Type', []);

        return this.http.get(this.url,
            { headers: this.HEADERS, params: params, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().activities;
            })
            .catch( err => 
                this.handleError(err) 
            );
    }

    /**
     * call php service to get Staff
     */
    getStaffList(req: string) {
        this.share.changeLoading(true);

        //let response = ResponseContentType.Json;

        this.url = this.BASE_URL + 'staff_query.php';

        /*
        const body = new FormData();
        body.append('data', JSON.stringify({
            req: req
        }));
        */
        let params = new URLSearchParams();
        params.append('req', req);

        //const headers =  new Headers();
        //headers.set('Content-Type', []);

        return this.http.get(this.url,
            { headers: this.HEADERS, params: params, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().staff;
            })
            .catch( err => 
                this.handleError(err)
            );
    }

    /**
     * call php service to get News
     */
    getNewsList(req: string) {
        this.share.changeLoading(true);

        let response = ResponseContentType.Json;
        
        this.url = this.BASE_URL + 'news_query.php';

        /*
        const body = new FormData();
        body.append('data', JSON.stringify({
            req: req
        }));
        */
        
        let params = new URLSearchParams();
        params.append('req', req);
        //const headers =  new Headers();
        //headers.set('Content-Type', []);
        //headers.set('Access-Control-Allow-Origin','*');
        //headers.set('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, '
        //    + 'Access-Control-Request-Method, Access-Control-Request-Headers');

        return this.http.get(this.url,
            { headers: this.HEADERS, params: params, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().news;
            })
            .catch( err => 
                this.handleError(err)
            );
    }

    /**
     * call php service to get Gallety images
     */
    getGalleryImages() {
        this.share.changeLoading(true);

        this.url = this.BASE_URL + 'gallery_query.php';

        return this.http.get(this.url, { headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json();
            })
            .catch( err => 
                this.handleError(err)
            );
    }

    /**
     * call php service to save/edit/delete activity
     */
    saveActivity(model, file): Promise<Error|string> {
        this.share.changeLoading(true);

        //let response = ResponseContentType.Json;

        this.url = this.BASE_URL + 'save_activity.php';

        const body = new FormData();
        body.append('data', JSON.stringify({
            id: model.id,
            title: model.title,
            desc: model.desc,
            video: model.video,
            img: model.image,
            show: model.show,
            type: model.type
        }));
        body.append('file', file);
        
        
        //const headers =  new Headers();
        //headers.set('Content-Type', []);
       
        return this.http.post(this.url, body,
            { headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().status;
            })
            .catch( err => 
                this.handleError(err) );
    }

    /**
     * call php service to save/edit/delete news
     */
    saveNews(model, file): Promise<Error|string> {
        this.share.changeLoading(true);

        //let response = ResponseContentType.Json;

        this.url = this.BASE_URL + 'save_news.php';

        const body = new FormData();
        body.append('data', JSON.stringify({
            id: model.id,
            title: model.title,
            desc: model.desc,
            img: model.image,
            video: model.video,
            date: model.date.getTime(),
            show: model.show,
            type: model.type
        }));
        body.append('file', file);
        
        //const headers =  new Headers();
        //headers.set('Content-Type', []);
       
        return this.http.post(this.url, body,
            { headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().status;
            })
            .catch( err => 
                this.handleError(err) );
    }

    /**
     * call php service to save/edit/delete news
     */
    saveStaff(model, file): Promise<Error|string> {
        this.share.changeLoading(true);

        //let response = ResponseContentType.Json;

        this.url = this.BASE_URL + 'save_staff.php';

        const body = new FormData();
        body.append('data', JSON.stringify({
            id: model.id,
            name: model.name,
            act: model.activity,
            desc: model.desc,
            img: model.image,
            show: model.show,
            type: model.type
        }));
        body.append('file', file);
        
        //const headers =  new Headers();
        //headers.set('Content-Type', []);
       
        return this.http.post(this.url, body,
            { headers: this.HEADERS, responseType: this.RESPONSE })
            .toPromise()
            .then( res => {
                console.log(res.json());
                this.share.changeLoading(false);
                return res.json().status;
            })
            .catch( err => 
                this.handleError(err) );
    }
    
     /**
     * call php service to send mail
     * @param name 
     * @param email 
     * @param subject 
     * @param message 
     */
    sendMail(name:string, email:string, subject:string, message:string) {   

        const obj = { name: name, email: email, subject: subject, message: message };
        const body = 'data=' + JSON.stringify(obj);

        this.url = this.BASE_URL + '/send_mail.php';

        this.http.post(this.url, body, { headers: this.HEADERS })
            .toPromise()
            .then( res => {
                console.log(res);
                return res.json().response;
            })
            .catch( err => 
                this.handleError(err)
            );
    }

}