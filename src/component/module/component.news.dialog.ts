import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'activity-dialog',
  templateUrl: '../../template/module/news.dialog.html',
  styleUrls: ['../../css/pages/news.css']
})
export class NewsDialogComponent implements OnInit {

  embedUrl = 'https://www.youtube.com/embed/';
  video = '';

  constructor(public dialogRef: MatDialogRef<NewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public news: any) {
    this.video = this.embedUrl + news.video;
  }

  ngOnInit() {
    /*
    let matDialogContainerCollections = document.getElementsByClassName('cdk-overlay-pane');
    let matDialogContainer = matDialogContainerCollections[0] as HTMLElement; 
    matDialogContainer.setAttribute('style', 'min-height:60%; max-height:80%;');
    if(this.news.video) {
        this.changeParentStyle();
    }
    */
  }

  changeParentStyle() {
    let matDialogContainerCollections = document.getElementsByClassName('mat-dialog-container');
    let matDialogContainer = matDialogContainerCollections[0] as HTMLElement;
    matDialogContainer.setAttribute('id', 'video-preview');

    let cdkOverlayDarkBackdropCollections = document.getElementsByClassName('cdk-overlay-dark-backdrop');
    let cdkOverlayDarkBackdrop = cdkOverlayDarkBackdropCollections[0] as HTMLElement;
    cdkOverlayDarkBackdrop.setAttribute('style', 'background: rgba(0,0,0,.800) !important');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkEmpty(value: string): boolean {
    if (value)
      return true;
    else
      return false;
  }

}