import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatIconModule,
  MatSnackBar,
  MatSnackBarContainer,
  MatSnackBarModule,
  DateAdapter,
  MatNativeDateModule
} from '@angular/material';


@NgModule({
  imports: [
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule
  ],
  entryComponents: [
    MatSnackBarContainer
  ],
  providers: [
    MatSnackBar
  ]
})
export class MaterialItensModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale("sk-SK");
  }
 }
