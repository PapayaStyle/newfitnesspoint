import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePHP } from '../../service/service';

import { Account } from '../../models/account';
import { Error } from '../../models/Error';

@Component({
    selector: 'app-login',
    templateUrl: '../../template/manager/login.html',
    styleUrls: ['../../css/manager/login.css']
})
export class LoginComponent implements OnInit {

    public form;

    public account: Account;
    public error: Error;
    
    constructor(@Inject(FormBuilder) private formBuilder: FormBuilder, 
                private service: ServicePHP,
                private router: Router) {}
    
    ngOnInit() {
        this.form = this.formBuilder.group({
            username: this.formBuilder.control('', Validators.compose([Validators.required])),
            password: this.formBuilder.control('', Validators.compose([Validators.required]))
        });
    }

    onSubmit(formValue) {
        console.log('Login' 
            + '\nUsername: ' + formValue.username 
            + '\nPassword: ' + formValue.password );
        
        let account: Account = new Account (formValue.username, formValue.password);
        this.error = null;

        this.service.login(account)
            .then( res => {
                //this.account = res as Account;
                this.router.navigate(['/control-panel']);
            })
            .catch( err => {
                this.error = err as Error;
            });
    }
    
}