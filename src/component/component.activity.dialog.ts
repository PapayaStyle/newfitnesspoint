import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'activity-dialog',
    templateUrl: '../template/activity.dialog.html',
    styleUrls: ['../css/activity.css']
  })
  export class ActivityDialogComponent {
  
    public embedUrl = 'https://www.youtube.com/embed/';

    constructor(public dialogRef: MatDialogRef<ActivityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public activity: any) { }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
    
    checkEmpty(value: string): boolean {
        if(value)
            return true;
        else
            return false;
    }
}