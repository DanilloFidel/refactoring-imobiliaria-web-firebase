import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatProgressBarModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatProgressBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatProgressBarModule],
})
export class MaterialItensModule { }
