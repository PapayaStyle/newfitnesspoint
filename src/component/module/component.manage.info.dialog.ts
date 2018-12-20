import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePHP } from '../../service/service';
import { ChooseDialogComponent } from './component.choose.dialog';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../app/app.data.adapter';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'manage-info-dialog',
  templateUrl: '../../template/module/manage.info.dialog.html',
  styleUrls: [
    '../../css/manager/control-panel.css',
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.info.css'
  ]
})
export class ManageInfoDialogComponent {

  public infoForm: FormGroup;
  public showPreview: boolean;
  public previewLabel: string;
  public previewIcon: string;
  public previewImage;

  constructor(private service: ServicePHP,
    @Inject(MAT_DIALOG_DATA) public info: any,
    public dialogRef: MatDialogRef<ManageInfoDialogComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastr: ToastrService) {

    this.initForm();

    if (this.info.type == 'I')
      this.showHidePreview(false);
    else
      this.showHidePreview(true);
  }

  initForm() {
    this.infoForm = this.fb.group({
      id: this.info.id,
      page: [this.info.page, Validators.required],
      title: [this.info.title, [Validators.required, Validators.maxLength(20)]],
      desc: [this.info.desc, Validators.required],
      show: this.info.show,
      type: [this.info.type, Validators.required]
    });
  }

  checkEmpty(value: string): boolean {
    if (value)
      return true;
    else
      return false;
  }

  /**
   * triggered by dialog when click outside dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * clear all form fields
   */
  clearForm() {
    this.infoForm = this.fb.group({
      page: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(20)]],
      desc: ['', Validators.required],
      type: [this.info.type, Validators.required],
      show: [false],
    });

    this.info.page = '';
    this.info.title = '';
    this.info.desc = '';
    this.info.show = false;
  }

  /**
   * show and hide the preview
   * @param value boolean optional
   */
  showHidePreview(value: boolean = null) {
    if (value != null)
      this.showPreview = value;
    else
      this.showPreview = !this.showPreview;

    if (this.showPreview) {

      this.previewLabel = 'Modifica';
      this.previewIcon = 'edit';
      this.info.title = this.infoForm.controls['title'].value;
      this.info.desc = this.infoForm.controls['desc'].value;

    } else {
      this.previewLabel = 'Anteprima';
      this.previewIcon = 'visibility';
    }

  }

  /**
   * send value to service request to save, update or delete Staff
   * @param value form value
   */
  async save(value) {
    console.log(value);
    let dialogRes: any;

    /*
    let res = await this.service.saveInfo(value, this.fileImg);
    if(res) {
      if (value.type == 'I')
        this.toastr.success('Info inserita con successo');
      else if (value.type == 'U')
        this.toastr.success(''Info aggiornata con successo');
      else if (value.type == 'D')
        this.toastr.success('Info cancellata con successo');

      this.dialogRef.close({ status: 'OK'});
    } else {
      this.dialogRef.close({ status: 'KO'});
    }
    */
  }

  /**
   * open confirm dialog for confirm Staff cancelation
   */
  openChooseDialog(): void {
    let dialogRef = this.dialog.open(ChooseDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Elimina ' + this.info.title,
        desc: `Sicuro di voler eliminare la info ` + this.info.title + `?`,
        btn_true: 'Conferma',
        btn_false: 'Annulla'
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        console.log('Confirm dialog closed');
        console.log(res);

        //if result is true, proceed with deletion
        if (res) {
          this.infoForm.controls['type'].setValue('D');
          this.save(this.infoForm.value);
        }
      });
  }

}