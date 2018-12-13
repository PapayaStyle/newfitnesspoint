import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePHP } from '../../service/service';

import { Account } from '../../models/account';
import { RestResponse } from '../../models/RestResponse';

@Component({
  selector: 'app-login',
  templateUrl: '../../template/manager/login.html',
  styleUrls: ['../../css/manager/login.css']
})
export class LoginComponent implements OnInit {

  public form;

  public account: Account;
  public restRes: RestResponse;

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    private service: ServicePHP,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control('', Validators.compose([Validators.required])),
      password: this.formBuilder.control('', Validators.compose([Validators.required]))
    });
  }

  async onSubmit(formValue) {
    console.log('Login'
      + '\nUsername: ' + formValue.username
      + '\nPassword: ' + formValue.password);

    let account: Account = new Account(); //(formValue.username, formValue.password);
    account.username = formValue.username;
    account.password = formValue.password;
    this.restRes = null;

    let res = await this.service.login(account);
    if(res.success) {
      this.router.navigate(['/control-panel']);
    } else {
      this.restRes = new RestResponse(res);
    }
  }

}