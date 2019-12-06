import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatDialogModule,
  MatCheckboxModule,
  MatInputModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSelectModule
  ]
})
export class MaterialModule {}