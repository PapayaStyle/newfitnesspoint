import { Component, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { SharedService } from '../../service/shared';
import { Account } from '../../models/account';
import {
  FormGroup, FormBuilder, FormControl,
  Validators, FormArray
} from '@angular/forms';

@Component({
  selector: 'act-row',
  templateUrl: '../../template/manager/form.row.html',
  styleUrls: ['../../css/manager/manage.table.css']
})
export class FormRowsComponent {

  @Input('rowFormGroup')
  public rowFormGroup: FormGroup;

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