import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { PopUpComponent } from '../_shared-components/pop-up/pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(title: string, msg: string): void {
    this.snackBar.openFromComponent(PopUpComponent, {
      data: [title, msg],
      panelClass: ['pop_up'],
      duration: 4000
    });
  }

}
