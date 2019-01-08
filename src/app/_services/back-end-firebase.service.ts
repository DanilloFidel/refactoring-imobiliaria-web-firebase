import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationService } from './navigation.service';
import { errorTextObj, resetPwdFormTextObj } from '../_utils/constants';
import isEmpty from 'lodash/isEmpty';
import { ErrorService } from './error.service';
import { SnackBarService } from './snack-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BackEndFirebaseService {
  public ngUnsubscribe: Subject<any> = new Subject<any>();
  public params: any;
  public actionCode: string = '';
  public actionCodeChecked: any;
  public newPassword: string;
  public textMsg = new BehaviorSubject(resetPwdFormTextObj);
  public panelText = this.textMsg.asObservable();
  public emailUser: string;
  public resetPwdFormValid: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private navigation: NavigationService,
    private snackService: SnackBarService,
    private spinner: NgxSpinnerService
  ) { }

  public getParams(): any {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.params = params;
      })

    return !isEmpty(this.params) && this.params
  }

  public getAuth() {
    return this.afAuth.auth;
  }


  public verifyIfExistingParams(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.getParams()) {
        this.navigation.navigateToRoute('./area-de-autenticacao');
      } else {
        resolve('Existem parametros.');
      }
    })
  }

  public checkLinkValidate(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.params.mode === 'resetPassword') {
        this.getAuth().verifyPasswordResetCode(this.params.oobCode)
          .then(() => {
            this.actionCodeChecked = true;
            this.actionCode = this.params.oobCode;
            this.textMsg.next(resetPwdFormTextObj);
          })
          .catch(() => {
            this.textMsg.next(errorTextObj);
          })
      }
    })
  }

  public resetPassword(pwd: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAuth().confirmPasswordReset(this.actionCode, pwd)
        .then(() => {
          this.snackService.openSnackBar('Senha alterada com sucesso!', 'Parabéns');
          resolve();
        })
        .catch(err => {
          this.hideLoading();
          this.textMsg.next(errorTextObj);
          this.navigation.navigateToRoute('./area-de-autenticacao',{});
        })
    })
  }

  public showLoading(): void{
    this.spinner.show();
  }

  public hideLoading(): void{
    this.spinner.hide();
  }
}
