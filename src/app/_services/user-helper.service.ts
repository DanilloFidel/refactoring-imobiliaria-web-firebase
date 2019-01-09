import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import isEmpty from 'lodash/isEmpty';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { resetPwdFormTextObj, errorTextObj, emailConfirmedTextObj } from '../_utils/constants';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {
  public $params = new BehaviorSubject<Params>(null);
  public $emailChangeIsDisable = new BehaviorSubject<boolean>(true);
  public textMsg = new BehaviorSubject(resetPwdFormTextObj);
  public oobCode: string;
  public linkMode: string;
  public recoveryPwdForm: boolean;
  public $validForm = new BehaviorSubject<boolean>(false);

  constructor(
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) {
    this.$params.next(this.getParams());
  }

  private getParams(): any {
    let urlParams;
    this.activatedRoute.queryParams
      .pipe()
      .subscribe((params) => {
        urlParams = params
        this.oobCode = params.oobCode;
        this.linkMode = params.mode;
      })
    return isEmpty(urlParams) ? null : urlParams;
  }


  public getAuth() {
    return this.afAuth.auth;
  }

  public applyCode(): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.getAuth().applyActionCode(this.oobCode)
        .then(()=>{
          resolve();
        })
    })
  }

  public checkUrlCodeIsValid(): Promise<any>{
    return new Promise((resolve,reject)=>{
      this.getAuth().checkActionCode(this.oobCode)
        .then(()=>{
          this.$emailChangeIsDisable.next(false);
          this.textMsg.next(emailConfirmedTextObj);
          this.applyCode();
          resolve();
        })
        .catch(()=>{
          this.$emailChangeIsDisable.next(true);
          this.recoveryPwdForm = false;
          this.textMsg.next(errorTextObj);
          reject();
        })
    })
  }

  public sendNewPasswordToFirebase(pwd: string): Promise<string>{
    return new Promise((resolve,reject)=>{
      this.getAuth().confirmPasswordReset(this.oobCode, pwd)
        .then(()=>{
          resolve();
        })
        .catch(()=>{
          resolve('error');
        })
    })
  }

}
