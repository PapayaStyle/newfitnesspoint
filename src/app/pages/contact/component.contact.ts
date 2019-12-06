import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Service } from '../../../service/service';
import { ActivatedRoute } from '@angular/router';
import { RestResponse } from '../../../models/RestResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  public form;
  private fragment: string;
  public wait = false;
  
  private regex: RegExp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    private service: Service,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

    this.initForm();
    
  }

  initForm() {
    this.form = this.formBuilder.group({
      name:     ['', [ Validators.required ] ],
      email:    ['', [ Validators.required, Validators.pattern(this.regex)]],
      subject:  ['', [ Validators.required ] ],
      message:  ['', [ Validators.required ] ]
    });
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  async send(formValue) {
    console.log('Submit'
      + '\nName: ' + formValue.name
      + '\nE-mail: ' + formValue.email
      + '\nSubject: ' + formValue.subject
      + '\nMessage: ' + formValue.message);
    
    this.wait = true;

    let response: RestResponse = await this.service.sendMail(formValue)
    .catch( err => { 
      this.initForm(); 
      this.wait = false;
    });

    if(response.statusText == 'OK')
      this.toastr.success(response.message);

    this.initForm();
    this.wait = false;
  }

}