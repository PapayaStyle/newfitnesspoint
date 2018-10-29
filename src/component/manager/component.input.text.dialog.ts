import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'choose-dialog',
    templateUrl: '../../template/manager/input.text.dialog.html'
})
export class InputTextDialogComponent {

    public inputText: String;

    constructor(public dialogRef: MatDialogRef<InputTextDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialog: any) { 
            this.inputText = dialog.text;
        }
    
    onNoClick(): void {
        this.dialogRef.close('false');
    }
    
    closeDialog(res: boolean) {
        let result = {
            res: res,
            text: this.inputText
        };

        console.log('InputTextDialogComponent: result ->' + JSON.stringify(result));
        this.dialogRef.close(result);
    }

}