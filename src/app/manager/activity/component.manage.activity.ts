import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Service } from '../../../service/service';
import { SharedService } from '../../../service/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityDialogComponent } from '../../module/dialog/activity/component.activity.dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage.activity.html',
  styleUrls: [
    '../manage.main.css',
    '../../pages/activity/activity.css',
    './manage.activity.css'
  ]
})
export class ManageActivityComponent implements OnInit {

  public activities;
  public showActivities: boolean;
  public showHideActivitiesLabel: string;
  public showHideActivitiesIcon: string;

  constructor(private service: Service,
    private shareService: SharedService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideActivitiesLabel = 'Mostra attività';
    this.showHideActivitiesIcon = 'visibility';
  }

  openActivityDialog(activity): void {
    let header = '';
    let type = '';

    if (activity == null) {
      header = 'Nuova Attività';
      type = 'I';
      activity = {
        // 'id': null,
        'name': '',
        'description': '',
        'image': '',
        'video': '',
        'show': false
      };
    } else {
      header = 'Modifica Attività';
      type = 'U';
    }

    let dialogRef = this.dialog.open(ActivityDialogComponent, {
      disableClose: true,
      height: '75%',
      width: '70%',
      data: {
        head: header,
        // id: activity.id,
        image: activity.image,
        video: activity.video,
        name: activity.name,
        description: activity.description,
        show: activity.show,
        type: type,
        readOnly: false
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        //window.scrollTo(0, 0);

        console.log('Activity dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {
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
    this.activities = await this.service.getActivities(false);
  }

}