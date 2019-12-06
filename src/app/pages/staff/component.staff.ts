import { Component, OnInit } from '@angular/core';
import { Service } from '../../../service/service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.html',
  styleUrls: ['./staff.css']
})
export class StaffComponent implements OnInit {
  public staffList;

  constructor(private service: Service) {}
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getStaff();
  }

  async getStaff() {
    this.staffList = await this.service.getStaffList(true);
  }

  changeBackground(image): any {
    return { 'background-image': 'url('+image+')'};
  }

  setHeight(height) {
    return { 'height': height+'px' };
  }

}