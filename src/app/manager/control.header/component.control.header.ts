import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../service/service';
import { SharedService } from '../../../service/shared';

import { Account } from '../../../models/account';
import { RestResponse } from '../../../models/RestResponse';
import { CookieService } from 'ngx-cookie-service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-control-header',
  templateUrl: './control.header.html',
  styleUrls: ['../control.panel/control-panel.css']
})
export class ControlHeaderComponent implements OnInit {

  @Input() sideControlMenu: MatSidenav;

  public account: string;
  public controlMenuSelected;

  constructor(private service: Service,
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
