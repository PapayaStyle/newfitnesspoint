import { Component, OnInit } from '@angular/core';
import { ServicePHP } from '../../service/service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewsDialogComponent } from '../module/component.news.dialog';

@Component({
  selector: 'app-home',
  templateUrl: '../../template/pages/home.html',
  styleUrls: [
    '../../css/pages/home.css',
    '../../css/pages/news.css',
    '../../css/module/table-courses.css'
  ]
})
export class HomeComponent implements OnInit {

  public calendarTitle = 'I Nostri Corsi';
  public newsTitle = 'Ultime News';

  public courses = [];
  public count = 0;

  public articles = [
    { title: 'Esperti del settore', desc: 'Gia dal 2007 ben saldi in Giaveno con innovazione nel mondo del fitness!\nNulla di improvvisato, da sempre PROFESSIONISTI nel settore fitness e wellness!', pos: '50% 48%' },
    { title: 'Per il Vostro benessere', desc: 'Proponiamo l\'attività di sala pesi abbinata a vari corsi come:\nSpinning - Zumba - Total Body - Pilates e molti altri!', pos: '99% 48%' },
    { title: 'Fitness Per tutti', desc: 'Molteplici le attività per tutti, da bimbi/e di 3/4 anni fino a over 80 e ben oltre.\nIl tutto plasmato e garantito da risultati fisici, salutari e tangibili oltre che agonistici su ogni disciplina', pos: '50% -1%' }
  ];

  public embedUrl = 'https://www.youtube.com/embed/';
  public newsList;

  constructor(private service: ServicePHP, public dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getNews();
    this.getCalendar();
  }

  async getNews() {
    this.newsList = await this.service.getNewsList('LAST');
  }

  async getCalendar() {
    this.courses = await this.service.getCalendar();
    console.log(this.courses);
  }

  getNote(activity) {
    if (!activity.note)
      return '';
    else
      return '(' + activity.note + ')';
  }

  changeBackground(value): any {
    return { 'background-position': value };
  }

  isFirstLast(first, last) {
    if (first)
      return 'first';
    if (last)
      return 'last';
  }

  loadBackground(image): any {
    return { 'background-image': 'url(' + image + ')' };
  }

  changeLabel(news) {
    if (news.image) {
      return 'Leggi altro';
    } else {
      return 'Guarda video';
    }
  }

  checkEmpty(value: string): boolean {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  openDialogNews(news): void {
    let height = '70%';
    let width = '70%';
    if (news.video) {
      height = 'auto';
      width = 'auto';
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