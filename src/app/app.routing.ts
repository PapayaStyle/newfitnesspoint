import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/component.home';
import { StaffComponent } from './pages/staff/component.staff';
import { ActivityComponent } from './pages/activity/component.activity';
import { GalleryComponent } from './pages/gallery/component.gallery';
import { ContactComponent } from './pages/contact/component.contact';
import { NewsComponent } from './pages/news/component.news';

import { LoginComponent } from './manager/login/component.login';
import { ControlPanelComponent } from './manager/control.panel/component.control.panel';
import { ManageCoursesComponent } from './manager/courses/component.manage.courses';
import { ManageActivityComponent } from './manager/activity/component.manage.activity';
import { ManageStaffComponent } from './manager/staff/component.manage.staff';
import { ManageNewsComponent } from './manager/news/component.manage.news';
import { ManageInfoComponent } from './manager/info/component.manage.info';

import { AuthGuard } from '../service/auth.guard';
import { ManageGalleryComponent } from './manager/gallery/component.manage.gallery';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'activity/:id', component: ActivityComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
  { 
    path: 'control-panel', component: ControlPanelComponent, canActivate: [AuthGuard],
    children: [
        { path: 'courses', component: ManageCoursesComponent },
        { path: 'activity', component: ManageActivityComponent },
        { path: 'staff', component: ManageStaffComponent },
        //{ path: 'info', component: ManageInfoComponent },
        { path: 'gallery', component: ManageGalleryComponent },
        { path: 'news', component: ManageNewsComponent }        
    ],
    canActivateChild: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(appRoutes);