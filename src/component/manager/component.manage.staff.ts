import { Component, OnInit } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { MatDialog } from '@angular/material';
import { StaffDialogComponent } from '../module/component.staff.dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-staff',
  templateUrl: '../../template/manager/manage.staff.html',
  styleUrls: [
    '../../css/manager/manage.main.css',
    '../../css/pages/staff.css',
    '../../css/manager/manage.staff.css']
})
export class ManageStaffComponent implements OnInit {

  public staffList;
  public showStaff: boolean;
  public showHideStaffLabel: string;
  public showHideStaffIcon: string;

  constructor(private service: ServicePHP,
    public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideStaffLabel = 'Mostra staff';
    this.showHideStaffIcon = 'visibility';
  }

  async getStaff() {
    this.staffList = await this.service.getStaffList('ALL');
  }

  showHideStaff() {
    if (this.showStaff) {
      this.showStaff = false;
      this.showHideStaffLabel = 'Mostra staff';
      this.showHideStaffIcon = 'visibility';
    } else {
      this.getStaff();
      this.showStaff = true;
      this.showHideStaffLabel = 'Nascondi staff';
      this.showHideStaffIcon = 'visibility_off';
    }
  }

  changeBackground(image): any {
    return { 'background-image': 'url(' + image + ')' };
  }

  openStaffDialog(staff): void {
    let height = '75%';
    let width = '70%';

    let header = '';
    let type = '';

    if (staff == null) {
      header = 'Nuovo Staff';
      type = 'I';
      staff = {
        'id': null,
        'image': '',
        'name': '',
        'activity': '',
        'portrait': '',
        'desc': '',
        'show': false
      };
    } else {
      header = 'Modifica Staff';
      type = 'U';
    }

    let dialogRef = this.dialog.open(StaffDialogComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        head: header,
        id: staff.id,
        image: staff.image,
        portrait: staff.portrait,
        name: staff.name,
        activity: staff.activity,
        desc: staff.desc,
        show: staff.show,
        type: type
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        //window.scrollTo(0, 0);

        console.log('Staff dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {

          if (this.showStaff)
            this.getStaff();
        }
      });
  }

  setHeight(height) {
    return { 'height': height+'px' };
  }

}