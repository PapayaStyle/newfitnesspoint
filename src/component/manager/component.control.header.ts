import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePHP } from '../../service/service';
import { SharedService } from '../../service/shared';

import { Account } from '../../models/account';
import { RestResponse } from '../../models/RestResponse';
import { CookieService } from 'ngx-cookie-service';
import { MatSidenav } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-control-header',
  templateUrl: '../../template/manager/panel.header.html',
  styleUrls: ['../../css/manager/control-panel.css']
})
export class ControlHeaderComponent implements OnInit {

  @Input() sideControlMenu: MatSidenav;

  public account: string;
  public controlMenuSelected;

  constructor(private service: ServicePHP,
    private cookie: CookieService,
    private shareService: SharedService,
    private router: Router) { }

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
