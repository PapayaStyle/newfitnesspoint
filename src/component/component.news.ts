import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { ServicePHP } from '../service/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewsDialogComponent } from './component.news.dialog';

@Component({
    selector: 'app-news',
    templateUrl: '../template/news.html',
    styleUrls: ['../css/news.css']
})
export class NewsComponent implements OnInit {

    public newsList;
    public embedUrl = 'https://www.youtube.com/embed/';
    
    constructor(private service: ServicePHP,
        public dialog: MatDialog,
        @Inject(DOCUMENT) private document: Document) { }
    
    ngOnInit() {
        window.scrollTo(0, 0);
        this.getNews();
    }

    getNews() {
        this.service.getNewsList('SHOW')
            .then( news => {
                this.newsList = news;
            });
    }

    loadBackground(image): any {
        return { 'background-image': 'url('+image+')'};
    }

    checkEmpty(value: string): boolean {
        if(value) {
            return true;
        } else {
            return false;
        }
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
                desc: news.desc,
                date: news.date
            }
        });
    }
    
}