import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { SharedService } from '../../service/shared';
import { Account } from '../../models/account';
import { CookieService } from '../../../node_modules/ngx-cookie-service';

@Component({
  selector: 'app-panel',
  templateUrl: '../../template/manager/control.panel.html',
  styleUrls: ['../../css/manager/control-panel.css']
})
export class ControlPanelComponent implements OnInit {

  public welcomeMessage: boolean;
  public account: string;
  public controlMenuSelected;

  constructor(private service: ServicePHP,
    private cookie: CookieService,
    private shareService: SharedService,
    private router: Router) {
    this.router.events.subscribe(route => {
      //console.log('Control Panel -> ' + router.url);
      this.welcomeMessage = router.url.endsWith('control-panel');
    });
  }

  ngOnInit() {
    this.account = this.cookie.get('account');
    this.shareService.controlMenuSelected
      .subscribe(selection => this.controlMenuSelected = selection);
  }

  doLogout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  updateSelector(value: string) {
    this.shareService.changeControlMenuSelection(value);
  }
}