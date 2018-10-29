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
import { ImageUploadModule } from 'angular2-image-upload';

import { AppComponent } from './app.component';
import { HeadComponent } from '../component/component.head';
import { FooterComponent } from '../component/component.footer';
import { HomeComponent } from '../component/component.home';
import { StaffComponent } from '../component/component.staff';
import { ContactComponent } from '../component/component.contact';
import { ActivityComponent } from '../component/component.activity';
import { ActivityDialogComponent } from '../component/component.activity.dialog';
import { HomeCarouselComponent } from '../component/component.home.carousel';
import { GalleryComponent } from '../component/component.gallery';
import { NewsComponent } from '../component/component.news';
import { NewsDialogComponent } from '../component/component.news.dialog';

import { LoginComponent } from '../component/manager/component.login';
import { ControlPanelComponent } from '../component/manager/component.control.panel';
import { ControlHeaderComponent } from '../component/manager/component.control.header';
import { ManageTableComponent } from '../component/manager/component.manage.table';
import { FormActivityComponent } from '../component/manager/component.form.activity';
import { FormRowsComponent } from '../component/manager/component.form.rows';
import { ManageActivityComponent } from '../component/manager/component.manage.activity';
import { ManageActivityDialogComponent } from '../component/manager/component.manage.activity.dialog';
import { ManageStaffComponent } from '../component/manager/component.manage.staff';
import { ManageNewsComponent } from '../component/manager/component.manage.news';
import { ManageNewsDialogComponent } from '../component/manager/component.manage.news.dialog';
import { ManageStaffDialogComponent } from '../component/manager/component.manage.staff.dialog';
import { ManageInfoComponent } from '../component/manager/component.manage.info';
import { ManageInfoDialogComponent } from '../component/manager/component.manage.info.dialog';

import { ChooseDialogComponent } from '../component/manager/component.choose.dialog';
import { InputTextDialogComponent } from '../component/manager/component.input.text.dialog';

import { ServicePHP } from '../service/service';
import { AuthGuard } from '../service/auth.guard';
import { SharedService } from '../service/shared';
import { CookieService } from 'ngx-cookie-service';

import { PipeCapitalize } from '../pipe/pipe.capitalize';
import { PipeSafe } from '../pipe/pipe.safe.url';

import { Routing } from './app.routing';
import { HeaderInterceptor } from '../service/interceptor';

registerLocaleData(localeIt, 'it');
@NgModule({
    imports: [ 
        BrowserModule, BrowserAnimationsModule, MaterialModule, 
        HttpModule, HttpClientModule, Routing, FormsModule, ReactiveFormsModule, 
        NgxGalleryModule, ImageUploadModule.forRoot()
    ],
    declarations: [ 
        PipeCapitalize, PipeSafe,
        AppComponent, HeadComponent, FooterComponent, 
        HomeComponent, StaffComponent, ActivityComponent, ActivityDialogComponent,
        GalleryComponent, ContactComponent, NewsComponent, NewsDialogComponent,
        HomeCarouselComponent, LoginComponent,
        ControlPanelComponent, ControlHeaderComponent, 
        ManageTableComponent, FormActivityComponent, FormRowsComponent, 
        ManageActivityComponent, ManageActivityDialogComponent, 
        ManageStaffComponent, 
        ManageNewsComponent, ManageNewsDialogComponent, ManageStaffDialogComponent,
        ManageInfoComponent, ManageInfoDialogComponent,
        ChooseDialogComponent, InputTextDialogComponent
    ],
    entryComponents: [ 
        ActivityDialogComponent,
        NewsComponent, NewsDialogComponent,
        ManageActivityDialogComponent, 
        ManageNewsDialogComponent, 
        ManageStaffDialogComponent,
        ManageInfoDialogComponent,
        ChooseDialogComponent, InputTextDialogComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ { provide: LOCALE_ID, useValue: 'it' },
        ServicePHP, AuthGuard, SharedService, CookieService , 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        }
    ]
})
export class AppModule { }