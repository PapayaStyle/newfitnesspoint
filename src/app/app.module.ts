import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { Routing } from './app.routing';
import { HeaderInterceptor } from '../service/interceptor';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './component/app.component';
import { HeadComponent } from './head/component.head';
import { FooterComponent } from './footer/component.footer';

/* PAGE Component */
import { HomeComponent } from './pages/home/component.home';
import { StaffComponent } from './pages/staff/component.staff';
import { ContactComponent } from './pages/contact/component.contact';
import { ActivityComponent } from './pages/activity/component.activity';
import { GalleryComponent } from './pages/gallery/component.gallery';
import { NewsComponent } from './pages/news/component.news';

/* MODULE Component */
import { HomeCarouselComponent } from './module/carousel/component.home.carousel';

import { ChooseDialogComponent } from './module/dialog/choose/component.choose.dialog';
import { InputTextDialogComponent } from './module/dialog/input/component.input.text.dialog';
import { UploadImageComponent } from './module/upload.image/component.upload.image';
import { ResizeCropImageComponent } from './module/resize.image/component.resize.crop.image';
import { CoursesComponent } from './module/courses/component.courses';

import { FormActivityComponent } from './module/form/activity/component.form.activity';
import { FormRowsComponent } from './module/form/rows/component.form.rows';
import { ActivityDialogComponent } from './module/dialog/activity/component.activity.dialog';
import { NewsDialogComponent } from './module/dialog/news/component.news.dialog';
import { StaffDialogComponent } from './module/dialog/staff/component.staff.dialog';
import { InfoDialogComponent } from './module/dialog/info/component.info.dialog';
import { GalleryDialogComponent } from './module/dialog/gallery/component.gallery.dialog';

/* MANAGER Component */
import { LoginComponent } from './manager/login/component.login';
import { ControlPanelComponent } from './manager/control.panel/component.control.panel';
import { ControlHeaderComponent } from './manager/control.header/component.control.header';
import { ManageCoursesComponent } from './manager/courses/component.manage.courses';
import { ManageActivityComponent } from './manager/activity/component.manage.activity';
import { ManageStaffComponent } from './manager/staff/component.manage.staff';
import { ManageNewsComponent } from './manager/news/component.manage.news';
import { ManageInfoComponent } from './manager/info/component.manage.info';
import { ManageGalleryComponent } from './manager/gallery/component.manage.gallery';

/* SERVICE Component */
import { BaseService } from '../service/base.service';
import { Service } from '../service/service';
import { AuthGuard } from '../service/auth.guard';
import { SharedService } from '../service/shared';
import { CookieService } from 'ngx-cookie-service';

/* PIPE Component */
import { PipeCapitalize } from '../pipe/pipe.capitalize';
import { PipeSafe } from '../pipe/pipe.safe.url';

/* START Alyle UI */
import {
  LyThemeModule,
  LY_THEME
} from '@alyle/ui';

import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';

import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
/* END Alyle UI */

registerLocaleData(localeIt, 'it');
@NgModule({
    imports: [ 
        BrowserModule, BrowserAnimationsModule, MaterialModule, 
        HttpModule, HttpClientModule, Routing, FormsModule, ReactiveFormsModule, 
        NgxGalleryModule, 
        LyThemeModule.setTheme('minima-light'),
        LyResizingCroppingImageModule, LyButtonModule, LyIconModule,
        ToastrModule.forRoot()
    ],
    declarations: [ 
      AppComponent, HeadComponent, FooterComponent,
      HomeComponent, StaffComponent, ContactComponent, ActivityComponent, GalleryComponent, NewsComponent,

      LoginComponent, ControlPanelComponent, ControlHeaderComponent, ManageCoursesComponent, 
      ManageActivityComponent, ManageStaffComponent, ManageNewsComponent, ManageInfoComponent, 
      ManageGalleryComponent,

      FormActivityComponent, FormRowsComponent, 
      ActivityDialogComponent, NewsDialogComponent, StaffDialogComponent, 
      InfoDialogComponent, GalleryDialogComponent,
      
      ChooseDialogComponent, InputTextDialogComponent, UploadImageComponent,
      ResizeCropImageComponent, HomeCarouselComponent, CoursesComponent, 

      PipeCapitalize, PipeSafe
    ],
    entryComponents: [ 
        ActivityDialogComponent, NewsDialogComponent, StaffDialogComponent,
        InfoDialogComponent, GalleryDialogComponent,
        ChooseDialogComponent, InputTextDialogComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ { provide: LOCALE_ID, useValue: 'it' },
      BaseService, Service, AuthGuard, SharedService, CookieService , 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
      { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
      { provide: LY_THEME, useClass: MinimaDark, multi: true } // name: `minima-dark`
    ]
})
export class AppModule { }