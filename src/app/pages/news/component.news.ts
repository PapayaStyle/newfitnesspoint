import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Service } from '../../../service/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { News } from '../../../models/News';
import { NewsDialogComponent } from '../../module/dialog/news/component.news.dialog';

@Component({
  selector: 'app-news',
  templateUrl: './news.html',
  styleUrls: ['./news.css']
})
export class NewsComponent implements OnInit {

  public newsList:News[];
  public embedUrl = 'https://www.youtube.com/embed/';
  
  constructor(private service: Service,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document) { }
  
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getNews();
  }

  async getNews() {
    this.newsList = await this.service.getNewsList(true);
    if(this.newsList == undefined || this.newsList.length == 0)
      this.newsList = null;
    console.log(this.newsList);
  }

  loadBackground(image): any {
    return { 'background-image': 'url('+image+')'};
  }

  checkEmpty(value): boolean {
    if(value)
      return true;
    else 
      return false;
  }

  openDialogNews(news): void {
    let height = '60%';
    let width = '60%';
    
    if(news.video) {
      height = '80%';
    }

    let dialogRef = this.dialog.open(NewsDialogComponent, {
      width: width,
      height: height,
      data: { 
        image: news.image, 
        video: news.video, 
        title: news.title, 
        description: news.description,
        date: news.date,
        readOnly: true
      }
    });
  }
  
}