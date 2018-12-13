import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { SharedService } from '../../service/shared';
import { Account } from '../../models/account';
import {
  FormGroup, FormBuilder, FormControl,
  Validators, FormArray
} from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
import { Activity } from '../../models/Activity';
import { Courses } from '../../models/Courses';

@Component({
  selector: 'app-manage-table',
  templateUrl: '../../template/manager/manage.table.html',
  styleUrls: [
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.table.css',
    '../../css/table-courses.css'
  ]
})
export class ManageTableComponent implements OnInit {

  public courses = [];
  public activities = [];
  public message: string = '';
  public showMsg: boolean;

  tableActForm: FormGroup;

  constructor(private service: ServicePHP,
    private shareService: SharedService,
    public builder: FormBuilder) {

    this.shareService.showMsg.subscribe(showMsg => this.showMsg = showMsg);

    this.getCalendar();
    this.getActivities();
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.shareService.changeMessageVisibility(false);

    this.tableActForm = this.builder.group({
      rows: this.builder.array([])
    });

    this.addRow();
  }

  /**
   * retrieve activity calendar from service
   */
  async getCalendar() {
    this.courses = await this.service.getCalendar();
  }

  isFirstLast(first, last) {
    if (first)
      return 'first';
    if (last)
      return 'last';
  }

  /**
   * reload calendar data when click on first tab
   * @param event 
   */
  reloadCalendar(event: MatTabChangeEvent) {
    window.scrollTo(0, 0);
    //console.log('event => ', event);
    //console.log('index => ', event.index);
    //console.log('tab => ', event.tab);

    if (event.index == 0) {
      this.getCalendar();
      this.shareService.changeMessageVisibility(false);
    }
  }

  getNote(activity) {
    if (!activity.note/* == '' || activity.note == null || activity.note == undefined*/)
      return '';
    else
      return '(' + activity.note + ')';
  }

  /**
   * retrieve all activities from service
   */
  async getActivities() {
    this.activities = await this.service.getActivities('ALL');
    this.activities.slice(1, this.activities.length);
  }

  /**
   * add new row with new control
   */
  addRow() {
    const control = <FormArray>this.tableActForm.controls['rows'];
    const addrCtrl = this.initRow();

    control.push(addrCtrl);

    this.shareService.changeMessageVisibility(false);
  }

  /**
   * initialize new form control
   */
  initRow() {
    return this.builder.group({
      hour: ['', [Validators.required, Validators.maxLength(5)]],
      monday: this.builder.array([]),
      tuesday: this.builder.array([]),
      wednesday: this.builder.array([]),
      thursday: this.builder.array([]),
      friday: this.builder.array([])
    });
  }

  /**
   * remove control at i position
   * @param i 
   */
  removeRow(i: number) {
    const control = <FormArray>this.tableActForm.controls['rows'];
    control.removeAt(i);

    this.shareService.changeMessageVisibility(false);
  }

  /**
   * reset form, remove all row and control
   */
  clearForm() {
    this.tableActForm = this.builder.group({
      rows: this.builder.array([])
    });

    this.shareService.changeMessageVisibility(false);

    window.scrollTo(0, 0);
  }

  /**
   * call service to save form calendar
   * @param model 
   */
  save(model) {
    //console.log(model);
    this.service.saveCalendar(model)
      .then(res => {
        console.log(res);
        this.message = res.message;

        this.shareService.changeMessageVisibility(true);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        this.message = 'Errore';
        this.shareService.changeMessageVisibility(true);
        window.scrollTo(0, 0);
      });
  }

  /**
   * check if form is empty
   * @param tableActForm 
   */
  isEmptyForm(tableActForm: FormGroup) {
    return tableActForm.controls.rows.value.length == 0 ? true : false;
  }

  /**
   * fill form table with values from db
   */
  fillForm() {
    this.getCalendar();

    //clear form
    this.tableActForm = this.builder.group({
      rows: this.builder.array([])
    });
    //initialize rows controllers array
    const formCtrl = <FormArray>this.tableActForm.controls['rows'];

    //cycle each row
    for (let row of this.courses) {
      //console.log(row);
      //create new row control
      const rowCtrl = this.builder.group({
        hour: [row.time, [Validators.required, Validators.maxLength(5)]],
        monday: this.builder.array([]),
        tuesday: this.builder.array([]),
        wednesday: this.builder.array([]),
        thursday: this.builder.array([]),
        friday: this.builder.array([])
      });

      // ##### Cycle each day #####

      //Create Monday controls array
      const mondayCtrl = <FormArray>rowCtrl.controls['monday'];
      //cycle monday activities
      for (let act of row.monday) {
        //create activity
        let actCtrl = this.builder.group({
          activity: [act.id, Validators.required],
          note: [act.note]
        });
        //push activity into monday control
        mondayCtrl.push(actCtrl);
      }

      //Create Tuesday controls array
      const tuesdayCtrl = <FormArray>rowCtrl.controls['tuesday'];
      //cycle monday activities
      for (let act of row.tuesday) {
        //create activity
        let actCtrl = this.builder.group({
          activity: [act.id, Validators.required],
          note: [act.note]
        });
        //push activity into monday control
        tuesdayCtrl.push(actCtrl);
      }

      //Create Wednesday controls array
      const wednesdayCtrl = <FormArray>rowCtrl.controls['wednesday'];
      //cycle monday activities
      for (let act of row.wednesday) {
        //create activity
        let actCtrl = this.builder.group({
          activity: [act.id, Validators.required],
          note: [act.note]
        });
        //push activity into monday control
        wednesdayCtrl.push(actCtrl);
      }

      //Create Thursday controls array
      const thursdayCtrl = <FormArray>rowCtrl.controls['thursday'];
      //cycle monday activities
      for (let act of row.thursday) {
        //create activity
        let actCtrl = this.builder.group({
          activity: [act.id, Validators.required],
          note: [act.note]
        });
        //push activity into monday control
        thursdayCtrl.push(actCtrl);
      }

      //Create Friday controls array
      const fridayCtrl = <FormArray>rowCtrl.controls['friday'];
      //cycle monday activities
      for (let act of row.friday) {
        //create activity
        let actCtrl = this.builder.group({
          activity: [act.id, Validators.required],
          note: [act.note]
        });
        //push activity into monday control
        fridayCtrl.push(actCtrl);
      }

      //push row control into form
      formCtrl.push(rowCtrl);
    }

    this.shareService.changeMessageVisibility(false);
    window.scrollTo(0, 0);
  }

}