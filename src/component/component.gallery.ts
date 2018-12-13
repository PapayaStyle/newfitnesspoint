import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../service/service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: '../template/gallery.html',
  styleUrls: ['../css/gallery.css']
})
export class GalleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = null;

  constructor(private service: ServicePHP) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.setOptions();
    this.getImages();
  }

  setOptions() {
    this.galleryOptions = [
      {
        imageAnimation: NgxGalleryAnimation.Slide,
        imageArrowsAutoHide: true,
        imagePercent: 80,
        /*
        imageAutoPlay: true,
        imageAutoPlayInterval: 3000,
        imageAutoPlayPauseOnHover: true,
        */
        imageInfinityMove: true,
        thumbnailsColumns: 4,
        thumbnailsRows: 1,
        thumbnailsPercent: 20,
        thumbnailMargin: 10,
        thumbnailsMargin: 10,
        thumbnailsMoveSize: 4,
        previewFullscreen: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewZoom: true,
        width: '800px',
        height: '550px',
      },
      // max-width 800
      {
        breakpoint: 800,
        previewFullscreen: false,
        previewZoom: false,
        width: '100%',
        height: '500px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 10,
        thumbnailMargin: 10
      },
      // max-width 900
      {
        breakpoint: 455,
        width: '99%',
        image: false,
        thumbnailSize: '40px',
        thumbnailsColumns: 3,
        thumbnailsRows: 4,
        thumbnailMargin: 5,
        thumbnailsMoveSize: 3,
        previewFullscreen: false
      }
    ];
  }

  async getImages() {
    this.galleryImages = await this.service.getGalleryImages();
  }

}