import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { UserHelperService } from '../_services/user-helper.service';
import { Subscription } from 'rxjs';
import { UserHelperComponent } from './user-helper/user-helper.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from '../_services/navigation.service';
import { PATHS, HELPERTEXTS } from '../_utils/constants';

@Component({
  selector: 'app-autentication-area',
  templateUrl: './autentication-area.component.html',
  styleUrls: ['./autentication-area.component.less']
})
export class AutenticationAreaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(UserHelperComponent) helperComponent: UserHelperComponent;
  public showRegisterFormPanel: boolean;
  public showRecoveryFormPanel: boolean;
  public showLoginFormPanel: boolean;
  public showUserFormHelper: boolean;
  public paramsSubscription: Subscription;
  public formValidSubscription: Subscription;
  public formValid: boolean;
  public emailChangeIsDisable: boolean;
  public notConfirmedEmail: boolean = true;
  public btnMsg: string;
  public urlMode: string;
  public helperMsg: string;
  public showBodyMsg: boolean;

  constructor(
    private userHelper: UserHelperService,
    private loader: NgxSpinnerService,
    private navigator: NavigationService
  ) { }

  ngOnInit() {
    this.watchParamsInUrl();
    this.userHelper.$emailChangeIsDisable.subscribe((resp)=>{
      this.emailChangeIsDisable = resp;
    })
    this.checkTypeOfResendEmail();
  }

  ngOnDestroy() {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
    this.formValidSubscription && this.formValidSubscription.unsubscribe();
  }

  ngAfterViewInit(): void{
    this.formValidSubscription = this.userHelper.$validForm.subscribe((value)=>{
      this.formValid = value;
    })
  }

  private watchParamsInUrl(): void{
    this.paramsSubscription = this.userHelper.$params.subscribe((params)=>{
      params ? this.showFormPanel('user-helper') : this.showFormPanel('login');
    })
  }

  public applyActionCode(): void{
    this.userHelper.applyCode()
      .then(()=>{
        this.navigator.navigateToRoute(PATHS.areaDoUsuario);
      })
  }

  public showFormPanel(evento: string): void {
    switch (evento) {
      case 'register':
        this.showRegisterFormPanel = true;
        this.showLoginFormPanel = false;
        break;
        case 'user-helper':
        this.showUserFormHelper = true;
        this.showLoginFormPanel = false;
        break;
      case 'recovery':
        this.showRecoveryFormPanel = true;
        this.showLoginFormPanel = this.showUserFormHelper = false;
        break;
      case 'login':
        this.showLoginFormPanel = true;
        this.showRecoveryFormPanel = this.showUserFormHelper = this.showRegisterFormPanel = false;
        break;
    }
  }

  public changePassword(): void{
    this.loader.show();
    this.userHelper.sendNewPasswordToFirebase(this.helperComponent.getNewPassword())
      .then((err)=>{
        this.loader.hide();
        //!err &&
      })
  }

  public checkTypeOfResendEmail(): void{
    this.urlMode = this.getParmMode();
    if(this.urlMode && this.urlMode === 'verifyEmail'){
      this.btnMsg = 'Entrar'
      this.helperMsg = HELPERTEXTS.loginAlert;
    }else if(this.urlMode && this.urlMode === 'resetPassword'){
      this.btnMsg = 'Voltar e reenviar'
      this.helperMsg = HELPERTEXTS.resetAlert;
    }
    this.showBodyMsg = true;
  }

  private getParmMode(): string{
    if(this.userHelper.$params.value){
      return this.userHelper.$params.value.mode;
    }
  }

  public changePanelAndClearUrl(type: string): void{
    this.navigator.navigateToRoute(PATHS.areaDeAutenticacao);
    this.showFormPanel(type);
  }

}
