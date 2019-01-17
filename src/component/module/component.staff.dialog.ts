import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePHP } from '../../service/service';
import { ChooseDialogComponent } from './component.choose.dialog';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../app/app.data.adapter';
import { ToastrService } from 'ngx-toastr';
import { ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';

@Component({
  selector: 'manage-staff-dialog',
  templateUrl: '../../template/module/staff.dialog.html',
  styleUrls: [
    '../../css/manager/control-panel.css',
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.staff.css'
  ]
})
export class StaffDialogComponent {

  private fileImg = null;
  private filePortrait = null;

  public staffForm: FormGroup;
  public showPreview: boolean;
  public previewLabel: string;
  public previewIcon: string;
  public previewImage;
  public previewPortrait;

  public convDate = null;

  constructor(private service: ServicePHP,
    @Inject(MAT_DIALOG_DATA) public staff: any,
    public dialogRef: MatDialogRef<StaffDialogComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastr: ToastrService) {

    this.previewImage = this.staff.image;
    this.previewPortrait = this.staff.portrait;

    this.initForm();
    this.fileImg = null;
    this.filePortrait = null;

    if (this.staff.type == 'I')
      this.showHidePreview(false);
    else
      this.showHidePreview(true);
  }

  initForm() {
    this.staffForm = this.fb.group({
      id: this.staff.id,
      name: [this.staff.name, [Validators.required, Validators.maxLength(50)]],
      activity: [this.staff.activity, [Validators.required, Validators.maxLength(50)]],
      desc: [this.staff.desc, Validators.required],
      image: [this.staff.image, Validators.required],
      portrait: this.staff.portrait,
      show: this.staff.show == 1 ? true : false,
      type: [this.staff.type, Validators.required]
    });
  }

  changeBackground(image): any {
    return { 'background-image': 'url(' + image + ')' };
  }

  checkEmpty(value: string): boolean {
    if (value)
      return true;
    else
      return false;
  }

  setHeight(height) {
    return { 'height': height+'px' };
  }

  /**
   * triggered by dialog when click outside dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * triggered after crop an image to upload
   * @param event 
   */
  onUploadImgFinished(event: ImgCropperEvent) {
    console.log(event);

    //store the uploaded image into variable
    this.fileImg = event;

    //read the new image URL for preview
    if (this.fileImg != null) {
      this.previewImage = this.fileImg.dataURL;
      this.staff.image = this.previewImage;
      this.staffForm.controls['image'].setValue(this.staff.image);
    } else {
      this.previewImage = null;
      this.staff.image = null;
      this.staffForm.controls['image'].setValue(null);
    }

    console.log(this.staffForm.valid);
    console.log(this.staffForm.value);
  }

  /**
   * triggered after crop an image(portrait) to upload
   * @param event 
   */
  onUploadPortraitFinished(event: ImgCropperEvent) {
    //console.log('onCropFinished');
    console.log(event);

    //store the cropped image into variable
    this.filePortrait = event;

    //read the new portrait image URL for preview
    if (this.filePortrait != null) {
      this.previewPortrait = this.filePortrait.dataURL;
      this.staff.portrait = this.previewPortrait;
      this.staffForm.controls['portrait'].setValue(this.staff.portrait);
    } else {
      this.previewPortrait = null;
      this.staff.portrait = null;
      this.staffForm.controls['portrait'].setValue(null);
    }
  }

  /**
   * clear and reset image upload fields
   */
  clearImages() {
    let clearUploadedElement = document.getElementById('clear-image');
    if (clearUploadedElement) {
      clearUploadedElement.click();
    }

    //clear image variable
    this.staff.image = '';
    this.previewImage = '';
    this.previewPortrait = '';
    this.fileImg = null;
    this.filePortrait = null;
  }

  /**
   * clear all form fields
   */
  clearForm() {
    this.staffForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      activity: ['', [Validators.required, Validators.maxLength(30)]],
      desc: ['', Validators.required],
      image: ['', Validators.required],
      portrait: [''],
      type: [this.staff.type, Validators.required],
      show: [false],
    });

    this.clearImages();

    this.staff.name = '';
    this.staff.activity = '';
    this.staff.desc = '';
    this.staff.image = '';
    this.staff.show = false;
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
      this.staff.name = this.staffForm.controls['name'].value;
      this.staff.activity = this.staffForm.controls['activity'].value;
      this.staff.desc = this.staffForm.controls['desc'].value;

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

    let res = await this.service.saveStaff(value, this.fileImg, this.filePortrait);
    if(res) {
      if (value.type == 'I')
        this.toastr.success('Staff inserito con successo');
      else if (value.type == 'U')
        this.toastr.success('Staff aggiornato con successo');
      else if (value.type == 'D')
        this.toastr.success('Staff cancellato con successo');

      this.dialogRef.close({ status: 'OK'});
    } else {
      this.dialogRef.close({ status: 'KO'});
    }
  }

  /**
   * open confirm dialog for confirm Staff cancelation
   */
  openChooseDialog(): void {
    let dialogRef = this.dialog.open(ChooseDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Elimina ' + this.staff.name,
        desc: `Sicuro di voler eliminare lo staff ` + this.staff.name + `?`,
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
          this.staffForm.controls['type'].setValue('D');
          this.save(this.staffForm.value);
        }
      });
  }

}