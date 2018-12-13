import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { SharedService } from '../../service/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageActivityDialogComponent } from './component.manage.activity.dialog';

@Component({
  selector: 'app-manage-activity',
  templateUrl: '../../template/manager/manage.activity.html',
  styleUrls: [
    '../../css/manager/manage.main.css',
    '../../css/activity.css',
    '../../css/manager/manage.activity.css'
  ]
})
export class ManageActivityComponent implements OnInit {

  public showMsg: boolean = false;
  public message: string = '';

  public activities;
  public showActivities: boolean;
  public showHideActivitiesLabel: string;
  public showHideActivitiesIcon: string;

  constructor(private service: ServicePHP,
    private shareService: SharedService,
    public dialog: MatDialog) {

    //this.shareService.showMsg.subscribe( showMsg => this.showMsg = showMsg );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideActivitiesLabel = 'Mostra attività';
    this.showHideActivitiesIcon = 'visibility';
    this.shareService.changeMessageVisibility(false);
  }

  openActivityDialog(activity): void {
    let header = '';
    let type = '';

    if (activity == null) {
      header = 'Nuova Attività';
      type = 'I';
      activity = {
        'id': null,
        'title': '',
        'desc': '',
        'image': '',
        'video': '',
        'show': false
      };
    } else {
      header = 'Modifica Attività';
      type = 'U';
    }

    let dialogRef = this.dialog.open(ManageActivityDialogComponent, {
      disableClose: true,
      height: '60%',
      width: '70%',
      data: {
        head: header,
        id: activity.id,
        image: activity.image,
        video: activity.video,
        title: activity.title,
        desc: activity.desc,
        show: activity.show,
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

        console.log('Activity dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {
          this.message = res.message;
          this.showMsg = true;

          if (this.showActivities)
            this.getActivities();
        }
      });
  }

  showHideActivity() {
    if (this.showActivities) {
      this.showActivities = false;
      this.showHideActivitiesLabel = 'Mostra attività';
      this.showHideActivitiesIcon = 'visibility';
    } else {
      this.getActivities();
      this.showActivities = true;
      this.showHideActivitiesLabel = 'Nascondi attività';
      this.showHideActivitiesIcon = 'visibility_off';
    }
  }

  async getActivities() {
    this.activities = await this.service.getActivities('ALL');
  }

}