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

import { AppComponent } from './app.component';
import { HeadComponent } from '../component/component.head';
import { FooterComponent } from '../component/component.footer';

/* PAGE Component */
import { HomeComponent } from '../component/pages/component.home';
import { StaffComponent } from '../component/pages/component.staff';
import { ContactComponent } from '../component/pages/component.contact';
import { ActivityComponent } from '../component/pages/component.activity';
import { GalleryComponent } from '../component/pages/component.gallery';
import { NewsComponent } from '../component/pages/component.news';

/* MODULE Component */
import { ActivityDialogComponent } from '../component/module/component.activity.dialog';
import { HomeCarouselComponent } from '../component/module/component.home.carousel';
import { NewsDialogComponent } from '../component/module/component.news.dialog';

import { ChooseDialogComponent } from '../component/module/component.choose.dialog';
import { InputTextDialogComponent } from '../component/module/component.input.text.dialog';
import { UploadImageComponent } from '../component/module/component.upload.image';
import { ResizeCropImageComponent } from '../component/module/component.resize.crop.image';

import { FormActivityComponent } from '../component/module/component.form.activity';
import { FormRowsComponent } from '../component/module/component.form.rows';
import { ManageActivityDialogComponent } from '../component/module/component.manage.activity.dialog';
import { ManageNewsDialogComponent } from '../component/module/component.manage.news.dialog';
import { ManageStaffDialogComponent } from '../component/module/component.manage.staff.dialog';
import { ManageInfoDialogComponent } from '../component/module/component.manage.info.dialog';
import { ManageGalleryDialogComponent } from '../component/module/component.manage.gallery.dialog';

/* MANAGER Component */
import { LoginComponent } from '../component/manager/component.login';
import { ControlPanelComponent } from '../component/manager/component.control.panel';
import { ControlHeaderComponent } from '../component/manager/component.control.header';
import { ManageTableComponent } from '../component/manager/component.manage.table';
import { ManageActivityComponent } from '../component/manager/component.manage.activity';
import { ManageStaffComponent } from '../component/manager/component.manage.staff';
import { ManageNewsComponent } from '../component/manager/component.manage.news';
import { ManageInfoComponent } from '../component/manager/component.manage.info';
import { ManageGalleryComponent } from '../component/manager/component.manage.gallery';

/* SERVICE Component */
import { BaseService } from '../service/base.service';
import { ServicePHP } from '../service/service';
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
      ActivityDialogComponent, HomeCarouselComponent, NewsDialogComponent,

      LoginComponent, ControlPanelComponent, ControlHeaderComponent, ManageTableComponent, 
      ManageActivityComponent, ManageStaffComponent, ManageNewsComponent, ManageInfoComponent, 
      ManageGalleryComponent,

      FormActivityComponent, FormRowsComponent, 
      ManageActivityDialogComponent, ManageNewsDialogComponent, ManageStaffDialogComponent, 
      ManageInfoDialogComponent, ManageGalleryDialogComponent,
      
      ChooseDialogComponent, InputTextDialogComponent, UploadImageComponent,
      ResizeCropImageComponent,

      PipeCapitalize, PipeSafe
    ],
    entryComponents: [ 
        ActivityDialogComponent,
        NewsComponent, NewsDialogComponent,
        ManageActivityDialogComponent, 
        ManageNewsDialogComponent, 
        ManageStaffDialogComponent,
        ManageInfoDialogComponent,
        ManageGalleryDialogComponent,
        ChooseDialogComponent, InputTextDialogComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ { provide: LOCALE_ID, useValue: 'it' },
      BaseService, ServicePHP, AuthGuard, SharedService, CookieService , 
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