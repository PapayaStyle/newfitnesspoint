import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePHP } from '../../service/service';
import { ChooseDialogComponent } from './component.choose.dialog';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../app/app.data.adapter';
import { ToastrService } from 'ngx-toastr';
import { ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';

@Component({
  selector: 'manage-news-dialog',
  templateUrl: '../../template/module/news.dialog.html',
  styleUrls: [
    '../../css/manager/control-panel.css',
    '../../css/manager/manage.main.css',
    '../../css/manager/manage.news.css'
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class NewsDialogComponent {

  public readOnly: boolean;

  //private defaultImage = 'http://localhost/images/default.jpg';
  private defaultImage = '/images/default.jpg';
  public embedUrl = 'https://www.youtube.com/embed/';
  public video = '';
  private fileImg = null;
  public vidChecked: boolean = false;
  public imgChecked: boolean = false;

  public newsForm: FormGroup;
  public showPreview: boolean;
  public previewLabel: string;
  public previewIcon: string;
  public previewImage;

  constructor(private service: ServicePHP,
    @Inject(MAT_DIALOG_DATA) public news: any,
    public dialogRef: MatDialogRef<NewsDialogComponent>,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastr: ToastrService) {

     this.readOnly = this.news.readOnly;

    if (news.video) {
      this.video = this.embedUrl + news.video;
      this.vidChecked = true;
    }
    this.imgChecked = !this.vidChecked;

    if (this.news.image == '') {
      this.previewImage = this.defaultImage;
      this.news.image = this.defaultImage;
    }
    this.previewImage = this.news.image;

    this.initForm();
    this.fileImg = null;

    if (this.news.type == 'I')
      this.showHidePreview(false);
    else
      this.showHidePreview(true);
  }

  initForm() {
    let date = new Date(this.news.date);

    this.newsForm = this.fb.group({
      id: this.news.id,
      title: [this.news.title, [Validators.required, Validators.maxLength(20)]],
      desc: [this.news.desc, Validators.required],
      image: [this.news.image, Validators.required],
      video: [this.news.video, Validators.required],
      date: [date, Validators.required],
      show: this.news.show == 1 ? true : false,
      type: [this.news.type, Validators.required]
    });
  }

  vidToggle(event) {
    this.vidChecked = !this.vidChecked;
    this.imgChecked = !this.vidChecked;
    console.log(!this.vidChecked);
  }
  imgToggle(event) {
    this.imgChecked = !this.imgChecked;
    this.vidChecked = !this.imgChecked;
    console.log(this.imgChecked);
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
    //this.clearImages();

    //store the uploaded image into variable
    this.fileImg = event;
    
    //read the new image as URL show to preview
    if (this.fileImg != null) {
      this.previewImage = this.fileImg.dataURL;
      this.news.image = this.previewImage;
      this.newsForm.controls['image'].setValue(this.news.image);
    } else {
      this.previewImage = null;
      this.news.image = null;
      this.newsForm.controls['image'].setValue(null);
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
    this.news.image = '';
    this.previewImage = '';
    this.fileImg = null;
  }

  /**
   * clear all form fields
   */
  clearForm() {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      desc: ['', Validators.required],
      image: [''],
      video: [''],
      date: [''],
      type: [this.news.type, Validators.required],
      show: [false],
    });

    this.clearImages();

    this.news.title = '';
    this.news.desc = '';
    this.news.image = '';
    this.news.video = '';
    this.news.date = '';
    this.news.show = false;
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
      this.news.date = this.newsForm.controls['date'].value;
      this.extractYoutubeVideoId();

      this.previewLabel = 'Modifica';
      this.previewIcon = 'edit';
      this.news.title = this.newsForm.controls['title'].value;
      this.news.desc = this.newsForm.controls['desc'].value;

    } else {
      this.previewLabel = 'Anteprima';
      this.previewIcon = 'visibility';
    }

  }

  /**
   * validate form if at least image or url in filled
   */
  checkValid() {
    if (this.newsForm.controls['title'].valid
      && this.newsForm.controls['desc'].valid
      && this.newsForm.controls['date'].valid
      && (
        (this.vidChecked == true && this.newsForm.controls['video'].valid)
        || (this.imgChecked == true && this.newsForm.controls['image'].valid)
      )
    ) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * send value to service request to save, update or delete News
   * @param value form value
   */
  async save(value) {

    if (this.vidChecked == true) {
      value.image = '';
      value.imgChecked = false;
    } else if (this.imgChecked == true) {
      value.video = '';
      value.imgChecked = true;
    }
    if(value.date != null && value.date != undefined) {
      value.date = value.date.getTime();
    }

    console.log(value);
    let dialogRes: any;

    let res = await this.service.saveNews(value, this.fileImg);
    if(res) {
      if (value.type == 'I')
        this.toastr.success('News inserita con successo');
      else if (value.type == 'U')
        this.toastr.success('News aggiornata con successo');
      else if (value.type == 'D')
        this.toastr.success('News cancellata con successo');

      this.dialogRef.close({ status: 'OK'});
    } else {
      this.dialogRef.close({ status: 'KO'});
    }
  }

  extractYoutubeVideoId() {
    let regex = new RegExp('(?<=v=).*');
    let tmp: string = this.newsForm.controls['video'].value;
    if (regex.test(tmp))
      this.news.video = regex.exec(tmp);
    else
      this.news.video = tmp;
    console.log(this.news.video);
  }

  /**
   * open confirm dialog for confimr News cancelation
   */
  openChooseDialog(): void {
    let dialogRef = this.dialog.open(ChooseDialogComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Elimina ' + this.news.title,
        desc: `Sicuro di voler eliminare la news ` + this.news.title + `?`,
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
          this.newsForm.controls['type'].setValue('D');
          this.save(this.newsForm.value);
        }
      });
  }

}