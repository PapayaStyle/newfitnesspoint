import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ImgResolution, ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';

const styles = {
  actions: {
    display: 'flex'
  },
  flex: {
    flex: 1
  }
};

@Component({
  selector: 'resize-crop-image',
  templateUrl: '../../template/module/resize.crop.image.html',
  styleUrls: ['../../css/module/resize.crop.image.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResizeCropImageComponent implements OnInit {

  @Input('label') label: string;
  @Input('width') width: number;
  @Input('height') height: number;

  @Input('image') image: string;
  
  @Input('preview') preview: boolean;
  @Input('preview-height') previewHeight;
  @Input('preview-width') previewWidth;

  @Output() file = new EventEmitter<any>();
  
  private defaultDim = 250;
  
  public classes = this.theme;
  public previewImage: string;

  public result: string;
  public myConfig: ImgCropperConfig;

  public showImage: any;
  public showComponent: boolean;

  public previewStyle: any;

  constructor( private theme: LyTheme2 ) { }

  ngOnInit() {
    if(this.image && this.preview) {
      this.previewImage = this.image;
    }

    if(this.width == null || this.width == undefined)
      this.width = this.defaultDim;
    
    if(this.height == null || this.height == undefined)
      this.height = this.defaultDim;

    //set crop dimension
    this.myConfig = {
      width: this.width, // Default `250`
      height: this.height // Default `200`,
    };

    if(this.preview) {
      this.previewStyle = {
        'width': this.previewWidth+'px',
        'height': this.previewHeight+'px'
      };
    } else {
      this.myConfig.output = ImgResolution.Default;
    }
    
  }

  onCropped(e: ImgCropperEvent) {
    //create file from url
    //let blob = new Blob([e.dataURL], {type: e.type});
    //let arrayOfBlob = new Array<Blob>();
    //arrayOfBlob.push(blob);
    //let file = new File([e.dataURL], e.name, {type: e.type});

    //console.log('file');
    //console.log(file);
    /*
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (read: any) => {
        this.previewImage = read.target.result;
    };
    */
    
    console.log('cropped img: ', e);
    this.previewImage = e.dataURL;

    this.file.emit(e);
  }

  onFileLoad(cropping, event) {
    let file = event.target.files[0];
    if(file) {
      cropping.selectInputEvent(event);
      this.toggleImage(true);
    }
  }

  toggleImage(val) {
    if(val) {
      this.showImage = { 'height': '300px'};
      this.showComponent = true;
    } else {
      this.showImage = { 'height': '0px'};
      this.showComponent = false;
    }
  }

  clean(cropping) {
    if(cropping)
      cropping.clean();
    
    this.image = null;
    this.previewImage = null;
    this.toggleImage(false);

    this.file.emit(null);
  }

}