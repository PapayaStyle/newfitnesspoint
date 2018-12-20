import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'upload-image',
  templateUrl: '../../template/module/upload.image.html',
  styleUrls: ['../../css/module/upload.image.css']
})
export class UploadImageComponent implements OnInit {

  @Input('previewType') previewType: string;
  @Input('image') image: string;

  @Output() file = new EventEmitter<any>();
  
  public fileImg;
  public preview = null;
  public previewThumb = null;

  ngOnInit() {
    if(this.image && (this.previewType == 'all' || this.previewType == 'small')) {
      this.previewThumb = this.image;
    }
    if(this.image && (this.previewType == 'all' || this.previewType == 'medium')) {
      this.preview = this.image;
    }
  }

  /**
   * triggered after select an image to upload
   * @param event 
   */
  readFile(event) {
    console.log(event.file);
    //store the uploaded image into variable
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if(this.previewType == 'all' || this.previewType == 'small') {
        this.previewThumb = e.target.result;
      } 
      if(this.previewType == 'all' || this.previewType == 'medium') {
        this.preview = e.target.result;
      }
    };
    
    this.file.emit(file);
  }

  clear() {
    this.fileImg = null;
    this.preview = null;
    this.previewThumb = null;

    this.file.emit(null);
  }

}