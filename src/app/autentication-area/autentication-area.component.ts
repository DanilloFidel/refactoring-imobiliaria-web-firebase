import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../_services/navigation.service';
import { ErrorService } from '../_services/error.service';
import { BackEndFirebaseService } from '../_services/back-end-firebase.service';

@Component({
  selector: 'app-autentication-area',
  templateUrl: './autentication-area.component.html',
  styleUrls: ['./autentication-area.component.less']
})
export class AutenticationAreaComponent implements OnInit {
  public showRegisterFormPanel: boolean;
  public showRecoveryFormPanel: boolean;
  public showLoginFormPanel: boolean = true;
  public showUserFormHelper: boolean;
  public aviso: any;

  constructor(
    private bckendFb: BackEndFirebaseService
  ) { }

  ngOnInit() {
    this.bckendFb.verifyIfExistingParams()
      .then((resp) => {
        resp && this.buildUserHelpPanel();
      })
  }

  public buildUserHelpPanel(): void {
    this.showLoginFormPanel = false;
    this.showUserFormHelper = true;
    this.bckendFb.checkLinkValidate().catch((email)=>console.log(email));
  }

  public showFormPanel(evento: string): void {
    switch (evento) {
      case 'register':
        this.showRegisterFormPanel = true;
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
