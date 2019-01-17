import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePHP } from '../../service/service';
import { ChooseDialogComponent } from './component.choose.dialog';
import { ToastrService } from 'ngx-toastr';
import { ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';

@Component({
  selector: 'manage-activity-dialog',
  templateUrl: '../../template/module/activity.dialog.html',
  styleUrls: [
    '../../css/manager/control-panel.css',
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.activity.css'
  ]
})
export class ActivityDialogComponent {

  public readOnly: boolean;

  //private defaultImage = 'http://localhost/images/default.jpg';
  private defaultImage = '/images/default.jpg';
  private fileImg = null;

  public activityForm: FormGroup;
  public showPreview: boolean;
  public previewLabel: string;
  public previewIcon: string;
  public previewImage;
  public embedUrl = 'https://www.youtube.com/embed/';

  constructor(private service: ServicePHP,
    @Inject(MAT_DIALOG_DATA) public activity: any,
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastr: ToastrService) {

    this.readOnly = this.activity.readOnly;

    if (this.activity.image == '')
      this.previewImage = this.defaultImage;
    else
      this.previewImage = this.activity.image;
    
    this.initForm();
    this.fileImg = null;

    if (this.activity.type == 'I')
      this.showHidePreview(false);
    else
      this.showHidePreview(true);
  }

  initForm() {
    this.activityForm = this.fb.group({
      id: this.activity.id,
      title: [this.activity.title, [Validators.required, Validators.maxLength(25)]],
      desc: [this.activity.desc, Validators.required],
      image: [this.activity.image, Validators.required],
      video: this.activity.video,
      show: this.activity.show == 1 ? true : false,
      type: [this.activity.type, Validators.required]
    });
  }

  /**
   * triggered by dialog when click outside dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * triggered after select an image to upload
   * @param event 
   */
  onUploadFinished(event: ImgCropperEvent) {
    console.log(event);

    //store the uploaded image into variable
    this.fileImg = event;

    //read the new image as URL show to preview
    if (this.fileImg != null) {
      this.previewImage = this.fileImg.dataURL;
      this.activity.image = this.previewImage;
      this.activityForm.controls['image'].setValue(this.activity.image);
    } else {
      this.previewImage = null;
      this.activity.image = null;
      this.activityForm.controls['image'].setValue(null);
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
    this.activity.image = 'default';
    this.previewImage = this.defaultImage;
    this.fileImg = null;
  }

  /**
   * clear all form fields
   */
  clearForm() {
    this.activityForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(25)]],
      desc: ['', Validators.required],
      image: [''],
      video: [''],
      show: [false, Validators.required],
      type: [this.activity.type, Validators.required]
    });

    this.clearImages();

    this.activity.title = '';
    this.activity.desc = '';
    this.activity.image = '';
    this.activity.video = '';
    this.activity.show = false;
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
      this.activity.title = this.activityForm.controls['title'].value;
      this.activity.desc = this.activityForm.controls['desc'].value;
      this.extractYoutubeVideoId();

    } else {
      this.previewLabel = 'Anteprima';
      this.previewIcon = 'visibility';
    }

  }

  /**
   * send value to service request to save, update or delete activity
   * @param value form value
   */
  async save(value) {
    console.log(value);
    let dialogRes: any;

    let res = await this.service.saveActivity(value, this.fileImg);
    if(res) {
      if (value.type == 'I')
        this.toastr.success('Attività inserita con successo');
      else if (value.type == 'U')
        this.toastr.success('Attività aggiornata con successo');
      else if (value.type == 'D')
        this.toastr.success('Attività cancellata con successo');

      this.dialogRef.close({ status: 'OK'});
    } else {
      this.dialogRef.close({ status: 'KO'});
    }
  }

  /**
   * open confirm dialog for confimr activity cancelation
   */
  openChooseDialog(): void {
    let dialogRef = this.dialog.open(ChooseDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Elimina ' + this.activity.title,
        desc: `Sicuro di voler eliminare l'attività ` + this.activity.title + `?`,
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
          this.activityForm.controls['type'].setValue('D');
          this.save(this.activityForm.value);
        }
      });
  }

  checkEmpty(value: string): boolean {
    if (value)
      return true;
    else
      return false;
  }

  extractYoutubeVideoId() {
    let regex = new RegExp('(?<=v=).*');
    let tmp: string = this.activityForm.controls['video'].value;
    if (regex.test(tmp))
      this.activity.video = regex.exec(tmp);
    else
      this.activity.video = tmp;
    console.log(this.activity.video);
  }

}