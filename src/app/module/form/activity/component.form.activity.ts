import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { InputTextDialogComponent } from '../../dialog/input/component.input.text.dialog';

@Component({
  selector: 'activity',
  templateUrl: './form.activity.html',
  styleUrls: ['../../../manager/courses/manage.courses.css']
})
export class FormActivityComponent {

  @Input('activityFormGroup')
  public activityFormGroup: FormGroup;

  @Input('activities')
  public activities: any[];

  public iconNote: string;

  constructor(public builder: FormBuilder,
    public dialog: MatDialog) { }

  hideElement(item) {
    return item != 1 ? true : false;
  }

  showNotes() {
    if (this.activityFormGroup.controls['note'].value == '')
      this.iconNote = 'note_add';
    else
      this.iconNote = 'insert_drive_file';

    let activity = this.activityFormGroup.controls['activity'].value;
    if (activity == null || activity == undefined || activity == '')
      return false;
    else
      return true;
  }

  openNotesDialog(): void {
    let selectedId = this.activityFormGroup.controls['activity'].value;
    let activity = this.activities.find(val => val.id == selectedId);

    let dialogRef = this.dialog.open(InputTextDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Nota per attività ' + activity.title,
        text: this.activityFormGroup.controls['note'].value,
        btn_true: 'Conferma',
        btn_false: 'Annulla'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('Confirm dialog closed');
        console.log('NotesDialog result ->');
        console.log(result);

        //if result is true, proceed with deletion
        if (result.res) {
          console.log(result.text);
          this.activityFormGroup.controls['note'].setValue(result.text);
        }
      });
  }

}