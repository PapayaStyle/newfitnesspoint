import { Component, OnInit, HostListener } from '@angular/core';
import { Service } from '../../../service/service';
import { MatDialog } from '@angular/material';
import { Gallery } from '../../../models/Gallery';
import { GalleryDialogComponent } from '../../module/dialog/gallery/component.gallery.dialog';

@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage.gallery.html',
  styleUrls: [
    '../manage.main.css',
    './manage.gallery.css']
})
export class ManageGalleryComponent implements OnInit {
  
  public galleryImages: Gallery[];
  public showGallery: boolean;
  public showHideLabel: string;
  public showHideIcon: string;

  public responsive;
  private screenWidth;

  constructor(private service: Service,
    public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideLabel = 'Mostra Immagini';
    this.showHideIcon = 'visibility';

    this.screenWidth = window.screen.width;
    console.log(this.screenWidth);
    this.calcResponsiveWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('onResize');
    this.screenWidth = event.target.innerWidth;
    console.log(this.screenWidth);

    this.calcResponsiveWidth();
  }

  calcResponsiveWidth() {
    let resW = 100 / ( Math.trunc( this.screenWidth / 200 ) );
    this.responsive = { 'width': resW+'%'};
  }

  async getImages() {
    this.galleryImages = await this.service.getGalleryImages();
  }

  showHideImages() {
    if (this.showGallery) {
      this.showGallery = false;
      this.showHideLabel = 'Mostra Immagini';
      this.showHideIcon = 'visibility';
    } else {
      this.getImages();
      this.showGallery = true;
      this.showHideLabel = 'Nascondi Immagini';
      this.showHideIcon = 'visibility_off';
    }
  }

  openGalleryDialog(image): void {
    let height = 'auto';
    let width = 'auto';

    let header = '';
    let type = '';

    if (image == null) {
      header = 'Nuova Immagine';
      type = 'I';
      image = {
        'id': '',
        'thumbnail': '',
        'preview': '',
        'image': '',
        'show': true
      };
    } else {
      header = 'Elimina Immagine';
      type = 'D';
    }

    let dialogRef = this.dialog.open(GalleryDialogComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        head: header,
        id: image.id,
        thumbnail: image.thumbnail,
        preview: image.preview,
        image: image.image,
        show: image.show,
        type: type
      }
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        window.scrollTo(0, 0);

        console.log('Gallery dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {
          if (this.showGallery)
            this.getImages();
        }
      });
  }

}