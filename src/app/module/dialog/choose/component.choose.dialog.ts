import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'choose-dialog',
  templateUrl: './choose.dialog.html'
})
export class ChooseDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChooseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialog: any) { }

  onNoClick(): void {
    this.dialogRef.close('false');
  }

}