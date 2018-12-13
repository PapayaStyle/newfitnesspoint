import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicePHP } from '../service/service';

@Component({
  selector: 'app-contact',
  templateUrl: '../template/contact.html',
  styleUrls: ['../css/contact.css']
})
export class ContactComponent implements OnInit {
  public form;

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    private service: ServicePHP) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.compose([
        Validators.required
      ])),
      email: this.formBuilder.control('', Validators.compose([
        Validators.required
      ])),
      subject: this.formBuilder.control('', Validators.compose([
        Validators.required
      ])),
      message: this.formBuilder.control('', Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit(formValue) {
    console.log('Submit'
      + '\nName: ' + formValue.name
      + '\nE-mail: ' + formValue.email
      + '\nSubject: ' + formValue.subject
      + '\nMessage: ' + formValue.message);

    let response = this.service
      .sendMail(formValue.name, formValue.email, formValue.subject, formValue.message);

    console.log(response[0].name);
  }

}