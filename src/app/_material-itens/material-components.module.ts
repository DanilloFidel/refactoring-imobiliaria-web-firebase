import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule
  ],
  entryComponents: []
})
export class MaterialItensModule { }
