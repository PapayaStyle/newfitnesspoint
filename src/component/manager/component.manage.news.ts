import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewsDialogComponent } from '../module/component.news.dialog';

@Component({
  selector: 'app-manage-news',
  templateUrl: '../../template/manager/manage.news.html',
  styleUrls: [
    '../../css/manager/manage.main.css',
    '../../css/pages/news.css',
    '../../css/manager/manage.news.css'
  ]
})
export class ManageNewsComponent implements OnInit {

  public showNews: boolean;
  public showHideNewsLabel: string;
  public showHideNewsIcon: string;

  public newsList;
  public embedUrl = 'https://www.youtube.com/embed/';

  constructor(private service: ServicePHP,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.showHideNewsLabel = 'Mostra news';
    this.showHideNewsIcon = 'visibility';
    //this.getNews();
  }

  showHideNews() {
    if (this.showNews) {
      this.showNews = false;
      this.showHideNewsLabel = 'Mostra news';
      this.showHideNewsIcon = 'visibility';
    } else {
      this.getNews();
      this.showNews = true;
      this.showHideNewsLabel = 'Nascondi news';
      this.showHideNewsIcon = 'visibility_off';
    }
  }

  async getNews() {
    this.newsList = await this.service.getNewsList('ALL');
  }

  loadBackground(image): any {
    return { 'background-image': 'url(' + image + ')' };
  }

  checkEmpty(value: string): boolean {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  changeLabel(news) {
    if (news.image) {
      return 'Leggi altro';
    } else {
      return 'Guarda video';
    }
  }

  openNewsDialog(news): void {
    let height = '75%';
    let width = '70%';

    let header = '';
    let type = '';

    if (news == null) {
      header = 'Nuova News';
      type = 'I';
      news = {
        'id': null,
        'image': '',
        'video': '',
        'title': '',
        'desc': '',
        'show': false
      };
    } else {
      header = 'Modifica News';
      type = 'U';
    }

    let dialogRef = this.dialog.open(NewsDialogComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        head: header,
        id: news.id,
        image: news.image,
        video: news.video,
        title: news.title,
        desc: news.desc,
        date: news.date,
        show: news.show,
        type: type,
        readOnly: false
      }
    });

    /*
    dialogRef.afterOpen()
      .subscribe(res => {
        this.showMsg = false;
      });
    */

    dialogRef.afterClosed()
      .subscribe(res => {
        //window.scrollTo(0, 0);

        console.log('Activity dialog closed');
        console.log(res);

        //check json res value
        if (res != undefined && (res.status == 'OK' || res.status == 'KO')) {

          if (this.showNews)
            this.getNews();
        }
      });
  }

}