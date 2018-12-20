import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePHP } from '../../service/service';
import { ChooseDialogComponent } from './component.choose.dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'manage-activity-dialog',
  templateUrl: '../../template/module/manage.activity.dialog.html',
  styleUrls: [
    '../../css/manager/control-panel.css',
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.activity.css'
  ]
})
export class ManageActivityDialogComponent {

  private defaultImage = 'http://localhost/images/default.jpg';
  private fileImg = null;

  public activityForm: FormGroup;
  public showPreview: boolean;
  public previewLabel: string;
  public previewIcon: string;
  public previewImage;
  public embedUrl = 'https://www.youtube.com/embed/';

  constructor(private service: ServicePHP,
    @Inject(MAT_DIALOG_DATA) public activity: any,
    public dialogRef: MatDialogRef<ManageActivityDialogComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastr: ToastrService) {

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
      image: this.activity.image,
      video: this.activity.video,
      show: [this.activity.show, Validators.required],
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
  onUploadFinished(event) {
    console.log(event);
    //put file into form
    //let control = this.activityForm.controls['image'];
    //control.setValue(event.file);
    //or
    //this.activityForm.get('image').setValue(event.file);

    //clear all images (only one can be present)
    //this.clearImages();

    //store the uploaded image into variable
    this.fileImg = event;
  }

  /**
   * listener to detect when clear or close image is clicked
   * @param event 
   */
  @HostListener('click', ['$event'])
  handleClearClick(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    if (target.attributes.class != undefined) {
      let classAttr = target.attributes.class.value;
      //console.log(classAttr);

      if (classAttr == 'img-ul-x-mark'
        || classAttr == 'img-ul-close'
        || classAttr == 'img-ul-clear img-ul-button') {
        console.log('remove image');

        this.activity.image = 'default';
        this.previewImage = this.defaultImage;
        this.fileImg = null;
      }
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
      //this.activity.Image = this.activityForm.controls['image'];
      //this.activity.video = this.activityForm.controls['video'].value;
      this.extractYoutubeVideoId();

      //read the new image as URL show to preview
      if (this.fileImg != null) {
        let reader = new FileReader();
        reader.readAsDataURL(this.fileImg);
        reader.onload = (e: any) => {
          this.previewImage = e.target.result;
          this.activity.image = this.previewImage;
        };
      }

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