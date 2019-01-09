import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formErrorMenssage, firebaseErrorMenssage } from '../_utils/constants';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errors: { [key: string]: string } = {};
  constructor(
    private snackBarService: SnackBarService
  ) { }

  public updateErrorMessages(form: FormGroup): any{
    this.errors = {};
    for (const message of formErrorMenssage) {
      const control = form.get(message.forControl);
      if (control && (control.dirty || control.pristine) &&
        control.invalid && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
        break;
      }
    }
    return this.errors;
  }

  public checkErrorMsg(errorMsg: string): any{
    this.errors = {}
    for(const error of firebaseErrorMenssage){
      if(errorMsg.includes(error.forValidator)){
        this.snackBarService.openSnackBar(error.text, 'Falha');
      }
    }
  }

}
