import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import isEmpty from 'lodash/isEmpty';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HELPERTEXTS } from '../_utils/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserHelperService {
  public $params = new BehaviorSubject<Params>(null);
  public $helperTexts = new BehaviorSubject<string>('');
  public oobCode: string;
  public linkMode: string;
  public recoveryPwdForm: boolean;
  public $linkCodeValid = new BehaviorSubject(false);

  constructor(
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService,
    private authService: AuthenticationService
  ) {
    this.$params.next(this.getParams());
    this.checkUrlCodeIsValid()
      .then(()=>{
        this.$linkCodeValid.next(true);
      })
      .catch((err)=>{
        this.$helperTexts.next(HELPERTEXTS.invalidCodeTitle)
      })
      .then(()=>this.spinner.hide())
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

  public applyCode(): Promise<any> {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      if(this.getAuth()){
        this.getAuth().applyActionCode(this.oobCode)
        .then(() => {
          this.authService.setUserToken();
          resolve();
        })
      }else{
        reject();
      }

    })
  }

  public checkUrlCodeIsValid(): Promise<any> {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.getAuth().checkActionCode(this.oobCode)
        .then(() => {
          resolve('funcionou');
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  public sendNewPasswordToFirebase(pwd: string): Promise<string> {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.getAuth().confirmPasswordReset(this.oobCode, pwd)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

  public sendNewConfirmationEmail(): Promise<string> {
    this.spinner.show();
    return new Promise((resolve) => {
      if(this.getAuth().currentUser){
        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            resolve(err);
          })
      }else{
        resolve('not logged');
      }

    })

  }

}
