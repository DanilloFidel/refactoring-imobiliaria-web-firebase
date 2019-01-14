import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { UserHelperService } from '../_services/user-helper.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationService } from '../_services/navigation.service';
import { PATHS, HELPERTEXTS } from '../_utils/constants';
import { AcessPanelComponent } from './acess-panel/acess-panel.component';


@Component({
  selector: 'app-autentication-area',
  templateUrl: './autentication-area.component.html',
  styleUrls: ['./autentication-area.component.less']
})
export class AutenticationAreaComponent implements OnInit, OnDestroy, AfterViewInit {
  public formPanelTransformState: string = 'criado';
  public showRegisterFormPanel: boolean;
  public showRecoveryFormPanel: boolean;
  public showLoginFormPanel: boolean;
  public showChangePwdFormPanel: boolean;
  public showNotCofirmedFormPanel: boolean;
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
    private navigator: NavigationService
  ) { }

  ngOnInit() {
    this.watchParamsInUrl();
    this.userHelper.$emailChangeIsDisable.subscribe((resp) => {
      this.emailChangeIsDisable = resp;
    })
    this.checkTypeOfResendEmail();
  }

  ngOnDestroy() {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
    this.formValidSubscription && this.formValidSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.formValidSubscription = this.userHelper.$validForm.subscribe((value) => {
      this.formValid = value;
    })
  }

  private watchParamsInUrl(): void {
    this.paramsSubscription = this.userHelper.$params.subscribe((params) => {
      params ? this.showFormPanel(this.getLinkMode()) : this.showFormPanel('login');
    })
  }

  public applyActionCode(): void {
    this.userHelper.applyCode()
      .then(() => {
        this.navigator.navigateToRoute(PATHS.areaDoUsuario);
      })
  }

  private getLinkMode(): string{
    console.log(this.userHelper.linkMode)
    return this.userHelper.linkMode;
  }

  public showFormPanel(evento: string): void {
    switch (evento) {
      case 'register':
        this.showRegisterFormPanel = true;
        this.showLoginFormPanel = false;
        break;
      case 'resetPassword':
        this.showChangePwdFormPanel = true;
        this.showLoginFormPanel = this.showNotCofirmedFormPanel = false;
        break;
      case 'verifyEmail':
        this.showNotCofirmedFormPanel = true;
        this.showLoginFormPanel = false;
        break;
      case 'recovery':
        this.showRecoveryFormPanel = true;
        this.showLoginFormPanel = this.showNotCofirmedFormPanel = false;
        break;
      case 'login':
        this.showLoginFormPanel = true;
        this.showRecoveryFormPanel = this.showNotCofirmedFormPanel = this.showRegisterFormPanel = this.showChangePwdFormPanel = false;
        break;
    }
  }


  public checkTypeOfResendEmail(): void {
    this.urlMode = this.getParmMode();
    if (this.urlMode && this.urlMode === 'verifyEmail') {
      this.btnMsg = 'Entrar'
      this.helperMsg = HELPERTEXTS.loginAlert;
    } else if (this.urlMode && this.urlMode === 'resetPassword') {
      this.btnMsg = 'Voltar e reenviar'
      this.helperMsg = HELPERTEXTS.resetAlert;
    }
    this.showBodyMsg = true;
  }

  private getParmMode(): string {
    if (this.userHelper.$params.value) {
      return this.userHelper.$params.value.mode;
    }
  }

  public changePanelAndClearUrl(type: string): void {
    this.navigator.navigateToRoute(PATHS.areaDeAutenticacao);
    this.showFormPanel(type);
  }

}
