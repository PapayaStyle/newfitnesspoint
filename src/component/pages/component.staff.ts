import { Component, OnInit } from '@angular/core';
import { ServicePHP } from '../../service/service';

@Component({
  selector: 'app-staff',
  templateUrl: '../../template/pages/staff.html',
  styleUrls: ['../../css/pages/staff.css']
})
export class StaffComponent implements OnInit {
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

  setHeight(height) {
    return { 'height': height+'px' };
  }

}