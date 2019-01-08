import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserHelperService } from '../_services/user-helper.service';
import { ActivatedRoute } from '@angular/router';
import { userFactory } from '../_utils/userFactory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autentication-area',
  templateUrl: './autentication-area.component.html',
  styleUrls: ['./autentication-area.component.less']
})
export class AutenticationAreaComponent implements OnInit, OnDestroy {
  public showRegisterFormPanel: boolean;
  public showRecoveryFormPanel: boolean;
  public showLoginFormPanel: boolean = true;
  public showUserFormHelper: boolean;
  public paramsSubscription: Subscription


  constructor(
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.watchParamsInUrl();
  }

  ngOnDestroy() {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }

  private watchParamsInUrl(): void{
    this.paramsSubscription = this.userHelper.$params.subscribe((params)=>{
      params ? this.showFormPanel('user-helper') : this.showFormPanel('login');
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



}
