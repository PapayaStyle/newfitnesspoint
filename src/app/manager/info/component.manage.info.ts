import { Component, OnInit } from '@angular/core';
import { Service } from '../../../service/service';
import { SharedService } from '../../../service/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfoDialogComponent } from '../../module/dialog/info/component.info.dialog';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage.info.html',
  styleUrls: [
    '../manage.main.css',
    './manage.info.css']
})
export class ManageInfoComponent implements OnInit {

  public infoList;
  public showInfo: boolean;
  public showHideInfoLabel: string;
  public showHideInfoIcon: string;

  constructor(private service: Service,
    public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideInfoLabel = 'Mostra Info e Slogan';
    this.showHideInfoIcon = 'visibility';
  }

  getInfo() {
    /*
    this.service.getInfoList('ALL')
        .then( info => {
            this.infoList = info;
        });
        */
  }

  showHideInfo() {
    if (this.showInfo) {
      this.showInfo = false;
      this.showHideInfoLabel = 'Mostra Info e Slogan';
      this.showHideInfoIcon = 'visibility';
    } else {
      this.getInfo();
      this.showInfo = true;
      this.showHideInfoLabel = 'Nascondi Info e Slogan';
      this.showHideInfoIcon = 'visibility_off';
    }
  }

  openInfoDialog(info): void {
    let height = '70%';
    let width = '70%';

    let header = '';
    let type = '';

    if (info == null) {
      header = 'Nuova Info e Slogan';
      type = 'I';
      info = {
        'id': null,
        'page': '',
        'title': '',
        'description': '',
        'show': false
      };
    } else {
      header = 'Modifica Info e Slogan';
      type = 'U';
    }

    let dialogRef = this.dialog.open(InfoDialogComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        head: header,
        id: info.id,
        page: info.page,
        title: info.title,
        description: info.description,
        show: info.show,
        type: type
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        window.scrollTo(0, 0);

        console.log('Info dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {
          if (this.showInfo)
            this.getInfo();
        }
      });
  }

}