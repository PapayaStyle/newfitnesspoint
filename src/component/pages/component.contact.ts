import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicePHP } from './../../service/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: '../../template/pages/contact.html',
  styleUrls: ['../../css/pages/contact.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  public form;
  private fragment: string;
  
  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
    private service: ServicePHP,
    private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

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

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  onSubmit(formValue) {
    console.log('Submit'
      + '\nName: ' + formValue.name
      + '\nE-mail: ' + formValue.email
      + '\nSubject: ' + formValue.subject
      + '\nMessage: ' + formValue.message);

    let response = this.service
      .sendMail(formValue);

    console.log(response[0].name);
  }

}