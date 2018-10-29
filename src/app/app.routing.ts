import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/component.home';
import { StaffComponent } from '../component/component.staff';
import { ActivityComponent } from '../component/component.activity';
import { GalleryComponent } from '../component/component.gallery';
import { ContactComponent } from '../component/component.contact';
import { NewsComponent } from '../component/component.news';

import { LoginComponent } from '../component/manager/component.login';
import { ControlPanelComponent } from '../component/manager/component.control.panel';
import { ManageTableComponent } from '../component/manager/component.manage.table';
import { ManageActivityComponent } from '../component/manager/component.manage.activity';
import { ManageStaffComponent } from '../component/manager/component.manage.staff';
import { ManageNewsComponent } from '../component/manager/component.manage.news';
import { ManageInfoComponent } from '../component/manager/component.manage.info';

import { AuthGuard } from '../service/auth.guard';

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
        { path: 'table', component: ManageTableComponent },
        { path: 'activity', component: ManageActivityComponent },
        { path: 'staff', component: ManageStaffComponent },
        { path: 'info', component: ManageInfoComponent },
        { path: 'gallery', component: ManageStaffComponent },
        { path: 'news', component: ManageNewsComponent }        
    ],
    canActivateChild: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const Routing = RouterModule.forRoot(appRoutes);