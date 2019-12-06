import { Component, OnInit } from '@angular/core';
import { Service } from '../../../service/service';
import { MatDialog } from '@angular/material';
import { StaffDialogComponent } from '../../module/dialog/staff/component.staff.dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage.staff.html',
  styleUrls: [
    '../manage.main.css',
    '../../pages/staff/staff.css',
    './manage.staff.css']
})
export class ManageStaffComponent implements OnInit {

  public staffList;
  public showStaff: boolean;
  public showHideStaffLabel: string;
  public showHideStaffIcon: string;

  constructor(private service: Service,
    public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideStaffLabel = 'Mostra staff';
    this.showHideStaffIcon = 'visibility';
  }

  async getStaff() {
    this.staffList = await this.service.getStaffList(false);
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
        'description': '',
        'showed': false
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
        description: staff.description,
        showed: staff.showed,
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