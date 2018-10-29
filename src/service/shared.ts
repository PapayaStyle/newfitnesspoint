import { Injectable, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Account } from '../models/account';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SharedService {

    constructor(private cookie: CookieService) { }
    
    private menuSelectedSource = new BehaviorSubject<string>(null);
    public menuSelected = this.menuSelectedSource.asObservable();

    private loadingSource = new BehaviorSubject<boolean>(null);
    public loading = this.loadingSource.asObservable();

    private showMsgSource = new BehaviorSubject<boolean>(null);
    public showMsg = this.showMsgSource.asObservable();

    private controlMenuSelectedSource = new BehaviorSubject<string>(null);
    public controlMenuSelected = this.controlMenuSelectedSource.asObservable();

    /** change value for selected menu */
    changeMenuSelection(selection: string) {
        //console.log('changeMenuSelection => selection: ' + selection);
        this.menuSelectedSource.next(selection);
    }

    /** change value for loading bar */
    changeLoading(load: boolean) {
        //console.log('changeLoading => load: ' + load);
        this.loadingSource.next(load);
    }
    
    changeMessageVisibility(show: boolean) {
        this.showMsgSource.next(show);
    }

    /** change value for selected control menu */
    changeControlMenuSelection(selection: string) {
        //console.log('changeControlMenuSelection => selection: ' + selection);
        this.controlMenuSelectedSource.next(selection);
    }
}