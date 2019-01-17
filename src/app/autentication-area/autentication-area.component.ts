import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserHelperService } from '../_services/user-helper.service';
import { Subscription } from 'rxjs';
import { NavigationService } from '../_services/navigation.service';
import { PATHS } from '../_utils/constants';
import noScroll from '../_utils/global.functions';



@Component({
  selector: 'app-autentication-area',
  templateUrl: './autentication-area.component.html',
  styleUrls: ['./autentication-area.component.less']
})
export class AutenticationAreaComponent implements OnInit, OnDestroy{
  public formPanelTransformState: string = 'criado';
  public showRegisterFormPanel: boolean;
  public showRecoveryFormPanel: boolean;
  public showLoginFormPanel: boolean;
  public showChangePwdFormPanel: boolean;
  public showNotCofirmedFormPanel: boolean;
  public paramsSubscription: Subscription;
  public urlMode: string;
  public helperMsg: string;
  public showBodyMsg: boolean;

  constructor(
    private userHelper: UserHelperService,
    private navigator: NavigationService
  ) { }

  ngOnInit() {
    this.watchParamsInUrl();
    noScroll();
  }

  ngOnDestroy() {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();

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
        this.showLoginFormPanel = this.showNotCofirmedFormPanel = this.showChangePwdFormPanel= false;
        break;
      case 'login':
        this.showLoginFormPanel = true;
        this.showRecoveryFormPanel = this.showNotCofirmedFormPanel = this.showRegisterFormPanel = this.showChangePwdFormPanel = false;
        break;
    }
  }
}
