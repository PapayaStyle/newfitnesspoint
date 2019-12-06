import { Component, Input } from '@angular/core';
import {
  FormGroup, FormBuilder, FormControl,
  Validators, FormArray
} from '@angular/forms';

@Component({
  selector: 'act-row',
  templateUrl: './form.row.html',
  styleUrls: ['../../../manager/courses/manage.courses.css']
})
export class FormRowsComponent {

  @Input('rowFormGroup')
  public rowFormGroup: FormGroup|any;

  @Input('activities')
  public activities: any[];

  constructor(public builder: FormBuilder) { }

  addActivity(day) {
    const control = <FormArray>this.rowFormGroup.controls[day];
    const addrCtrl = this.initActivity();

    control.push(addrCtrl);
  }

  initActivity() {
    return this.builder.group({
      activity: ['', Validators.required],
      note: ['']
    });
  }

  removeActivity(i: number, day) {
    const control = <FormArray>this.rowFormGroup.controls[day];
    control.removeAt(i);
  }

  isFilled(day) {
    const control = <FormArray>this.rowFormGroup.controls[day];
    if (control.length > 0)
      return 'filled';
    else
      return 'empty';
  }

}