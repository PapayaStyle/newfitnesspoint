import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ActivityDialogComponent } from '../module/component.activity.dialog';

@Component({
  selector: 'app-activity',
  templateUrl: '../../template/pages/activity.html',
  styleUrls: ['../../css/pages/activity.css']
})
export class ActivityComponent implements OnInit {

  public hidePopup = true;

  private paramLink;

  public activities;

  constructor(private service: ServicePHP,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    public route: ActivatedRoute) {
    this.getActivity();
  }

  async ngOnInit() {
    window.scrollTo(0, 0);

    await this.getActivity();

    //get parameter
    this.route.params.subscribe(params => {
      this.paramLink = params['id'];

      //check if param exist
      if (this.paramLink) {

      //gell all activities and check if param exist
        this.activities.forEach(activity => {
          if (activity.link == this.paramLink) {
            //open popup dialog
            this.openActivityDialog(activity);
          }
        });
      }
    });
  }

  async getActivity() {
    this.activities = await this.service.getActivities('SHOW');
  }

  openActivityDialog(activity): void {
    let dialogRef = this.dialog.open(ActivityDialogComponent, {
      height: '65%',
      width: '70%',
      data: {
        image: activity.image,
        video: activity.video,
        title: activity.title,
        desc: activity.desc,
        readOnly: true
      }
    });
  }

}