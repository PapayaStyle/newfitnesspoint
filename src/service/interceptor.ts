import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private cookie: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.cookie.check('token')) { // e.g. if token exists, otherwise use incomming request.
            return next.handle(req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': '*',
                    'Authorization': this.cookie.get('token')
                }
            }));
        } else {
            return next.handle(req);
        }
    }

}