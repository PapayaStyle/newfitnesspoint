import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../service/service';

@Component({
  selector: 'app-staff',
  templateUrl: '../template/staff.html',
  styleUrls: ['../css/staff.css']
})
export class StaffComponent implements OnInit {

  public staff = [ {Link: ``, Image: ``, Title: ``, Desc: ``} ];

  public staffList;

  constructor(private service: ServicePHP) {}
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getStaff();
  }

  async getStaff() {
    this.staffList = await this.service.getStaffList('SHOW');
  }

  changeBackground(image): any {
    return { 'background-image': 'url('+image+')'};
  }
}