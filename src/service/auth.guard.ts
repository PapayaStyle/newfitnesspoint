import { Injectable } from '@angular/core';
import { 
    Router,ActivatedRouteSnapshot, 
    RouterStateSnapshot, CanActivate, CanActivateChild
} from '@angular/router';

import { ServicePHP } from '../service/service';
import { CookieService } from 'ngx-cookie-service';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,
        private cookie: CookieService,
        private service: ServicePHP) { }
 
    canActivate(routeAct: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) { 
        return this.doAuth(routeAct, 'canActivate -> ');
    }

    canActivateChild(routeAct: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.doAuth(routeAct, 'canActivateChild -> ');
    }

    doAuth(routeAct: ActivatedRouteSnapshot, method: string) {
        let url = routeAct.url.toString();
        console.log(url);

        let existToken = this.cookie.check('token');
        console.log(existToken);

        if(url.includes('login')) {
            if(existToken) {
                console.log(method + 'login routing and Authentication token exist, redirect to test');
                this.router.navigate(['/control-panel']);
                return false;
            } else {
                console.log(method + 'Authentication token not present, continue to login');
                return true;
            }
        } else if (!existToken) {
            console.log(method + 'Authentication token not present, redirect to login');
            this.router.navigate(['/login']);
            return false;
        } else {
            console.log(method + 'Authentication token present, check validity');
            return this.service.auth()
                .then( res => {
                    console.log('AuthGuard -> '+ method + res);
                    if(res == true)
                        return true;
                    else 
                        return false;
                })
                .catch( err => {
                    console.log('AuthGuard -> ' + method + err.message);
                    this.router.navigate(['/login']);
                    return false;
                });
        }
    }
}