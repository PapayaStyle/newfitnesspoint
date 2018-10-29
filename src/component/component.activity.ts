import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../service/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivityDialogComponent } from './component.activity.dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-activity',
    templateUrl: '../template/activity.html',
    styleUrls: ['../css/activity.css']
})
export class ActivityComponent implements OnInit {

    public hidePopup = true;

    private paramLink;

    /*public activity: any = {'Link': '', 'Image': '', 'Title': '', 'Desc': ''};*/

    public activities;

    constructor(private service: ServicePHP, 
        public dialog: MatDialog,
        @Inject(DOCUMENT) private document: Document,
        public route: ActivatedRoute) {
        
        this.getActivity();
    }
   
    ngOnInit() {
        window.scrollTo(0, 0);

        this.getActivity();

        //get parameter
        this.route.params.subscribe( params => {
            this.paramLink = params['id'];
            
            //check if param exist
            if(this.paramLink) {

                //gell all activities and check if param exist
                this.service.getActivities('SHOW')
                    .then( act => {
                        act.forEach( activity => {
                            if(activity.link == this.paramLink) {
                                //open popup dialog
                                this.openActivityDialog(activity);
                            }
                        });
                    });
            }
        });
    }
    
    getActivity() {
        this.service.getActivities('SHOW')
        .then( act => {
            this.activities = act;
        });
    }
   
    openActivityDialog(activity): void {
        let dialogRef = this.dialog.open(ActivityDialogComponent, {
            height: '60%',
            width: '70%',
            data: { 
                image: activity.image, 
                video: activity.video, 
                title: activity.title, 
                desc: activity.desc 
            }
        });
    }

}