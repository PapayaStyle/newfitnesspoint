import { Component, OnInit } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { SharedService } from '../../service/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageInfoDialogComponent } from './component.manage.info.dialog';

@Component({
  selector: 'app-manage-staff',
  templateUrl: '../../template/manager/manage.info.html',
  styleUrls: [
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.info.css']
})
export class ManageInfoComponent implements OnInit {

  public showMsg: boolean = false;
  public message: string = '';

  public infoList;
  public showInfo: boolean;
  public showHideInfoLabel: string;
  public showHideInfoIcon: string;

  constructor(private service: ServicePHP,
    private shareService: SharedService,
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
        'desc': '',
        'show': false
      };
    } else {
      header = 'Modifica Info e Slogan';
      type = 'U';
    }

    let dialogRef = this.dialog.open(ManageInfoDialogComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        head: header,
        id: info.id,
        page: info.page,
        title: info.title,
        desc: info.desc,
        show: info.show,
        type: type
      }
    });

    dialogRef.afterOpen()
      .subscribe(res => {
        this.showMsg = false;
      });

    dialogRef.afterClosed()
      .subscribe(res => {
        window.scrollTo(0, 0);

        console.log('Info dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {
          this.message = res.message;
          this.showMsg = true;

          if (this.showInfo)
            this.getInfo();
        }
      });
  }

}