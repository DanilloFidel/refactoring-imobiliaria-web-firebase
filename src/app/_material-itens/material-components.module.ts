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
  MatSnackBarModule
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
    MatIconModule
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
export class MaterialItensModule { }
