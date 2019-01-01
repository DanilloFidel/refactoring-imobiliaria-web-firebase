import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NavigationService } from '../_services/navigation.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.less']
})
export class UserAreaComponent implements OnInit {
  public greetings = 'Bom dia, Usuário!'
  constructor(
    private authService: AuthenticationService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {

  }

  public logout(): void{
    this.authService.logout();
    this.navigation.navigateToRoute('/');
  }

  public getUserType(): number{
    return
  }

  public checkUserType(): void{

  }

}
