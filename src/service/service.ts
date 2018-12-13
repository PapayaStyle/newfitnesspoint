import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../models/account';
import { SharedService } from './shared';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Courses } from '../models/Courses';
import { Activity } from '../models/Activity';
import { Staff } from '../models/Staff';
import { News } from '../models/News';
import { Gallery } from '../models/Gallery';
import { RestResponse } from '../models/RestResponse';
import { BaseService } from './base.service';
import { RequestObj } from '../models/RequestObj';

@Injectable()
export class ServicePHP extends BaseService {

  constructor(protected httpClient: HttpClient,
    protected cookie: CookieService,
    protected share: SharedService) {
    super(httpClient, cookie, share);
  }

  /**
   * call php service to do login
   * @param username 
   * @param password 
   */
  async login(account: Account): Promise<any> {
    console.log('Service --> login');
    this.share.changeLoading(true);

    let url = 'login.php';
    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.POST(requestObj, account);
    if (response) {
      this.setCookieToken(response);
      return { success: true };
    } else {
      return { success: false };
    }
  }

  /**
   * call php service to check authentication
   */
  async auth(): Promise<any> {
    console.log('Service --> auth');
    this.share.changeLoading(true);

    let url = 'auth.php';
    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.POST(requestObj);
    if (response) {
      return response;
    } else {
      return { error: true };
    }
  }

  /**
   * destroy authentication token 
   */
  logout() {
    this.cookie.deleteAll();
    //console.log(this.cookie.getAll());
    this.HEADERS.delete('Authorization');
  }

  /* ##### START ##### GET REQUEST ##### */

  /**
   * call php service to get Calendar
   */
  async getCalendar(): Promise<any> {
    console.log('Service --> getCalendar');
    this.share.changeLoading(true);

    let url = 'calendar_query.php';
    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.GET(requestObj);
    if (response) {
      response = response.map(res => new Courses(res));
      return response;
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to get Activities
   */
  async getActivities(req: string): Promise<any> {
    console.log('Service --> getActivities');
    this.share.changeLoading(true);

    let url = 'activity_query.php';
    let queryString = '?req=' + req;
    url = url + queryString;

    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.GET(requestObj);
    if (response) {
      response = response.map(res => new Activity(res));
      return response;
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to get Staff
   */
  async getStaffList(req: string): Promise<any> {
    console.log('Service --> getStaffList');
    this.share.changeLoading(true);

    let url = 'staff_query.php';
    let queryString = '?req=' + req;
    url = url + queryString;

    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.GET(requestObj);
    if (response) {
      response = response.map(res => new Staff(res));
      return response;
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to get News
   */
  async getNewsList(req: string): Promise<any> {
    console.log('Service --> getNewsList');
    this.share.changeLoading(true);

    let url = 'news_query.php';
    let queryString = '?req=' + req;
    url = url + queryString;

    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.GET(requestObj);
    if (response) {
      response = response.map(res => new News(res));
      return response;
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to get Gallety images
   */
  async getGalleryImages(): Promise<any> {
    console.log('Service --> getGalleryImages');
    this.share.changeLoading(true);

    let url = 'gallery_query.php';
    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.GET(requestObj);
    if (response) {
      response = response.map(res => new Gallery(res));
      return response;
    } else {
      return { error: true };
    }
  }
  /* ##### END ##### GET REQUEST ##### */


  /**
   * call php service to save Calendar
   */
  async saveCalendar(model): Promise<any> {
    console.log('Service --> saveCalendar');
    this.share.changeLoading(true);

    let url = 'save_calendar.php';
    //const body = JSON.stringify(model);
    let requestObj = new RequestObj(url, model);

    let response: any;
    response = await this.PUT(requestObj);
    if (response) {
      return new RestResponse(response);
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to save/edit/delete activity
   */
  async saveActivity(model, file): Promise<any> {
    console.log('Service --> saveActivity');
    this.share.changeLoading(true);

    let url = 'save_activity.php';

    let param = new FormData();
    param.append('data', JSON.stringify(model));
    param.append('file', file);

    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.POST(requestObj, param);
    if (response) {
      return new RestResponse(response);
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to save/edit/delete news
   */
  async saveNews(model, file): Promise<any> {
    console.log('Service --> saveNews');
    this.share.changeLoading(true);

    let url = 'save_news.php';

    const param = new FormData();
    param.append('data', JSON.stringify({
      id: model.id,
      title: model.title,
      desc: model.desc,
      img: model.image,
      video: model.video,
      date: model.date.getTime(),
      show: model.show,
      type: model.type
    }));
    param.append('file', file);

    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.POST(requestObj, param);
    if (response) {
      return new RestResponse(response);
    } else {
      return { error: true };
    }
  }

  /**
   * call php service to save/edit/delete news
   */
  async saveStaff(model, file): Promise<any> {
    console.log('Service --> saveStaff');
    this.share.changeLoading(true);

    let url = 'save_staff.php';

    const param = new FormData();
    param.append('data', JSON.stringify({
      id: model.id,
      name: model.name,
      act: model.activity,
      desc: model.desc,
      img: model.image,
      show: model.show,
      type: model.type
    }));
    param.append('file', file);

    let requestObj = new RequestObj(url, {});

    let response: any;
    response = await this.POST(requestObj, param);
    if (response) {
      return new RestResponse(response);
    } else {
      return { error: true };
    }
  }

  /**
 * call php service to send mail
 * @param name 
 * @param email 
 * @param subject 
 * @param message 
 */
  async sendMail(name: string, email: string, subject: string, message: string): Promise<any> {
    const obj = { name: name, email: email, subject: subject, message: message };
    const body = JSON.stringify(obj);

    let url = this.BASE_URL + '/send_mail.php';

    return this.httpClient.post(url, body,
      { headers: this.HEADERS, responseType: 'json' })
      .toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err =>
        this.handleError(err)
      );
  }

}