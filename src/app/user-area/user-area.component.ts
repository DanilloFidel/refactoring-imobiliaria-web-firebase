import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NavigationService } from '../_services/navigation.service';
import { DatabaseService } from '../_services/database.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.less']
})
export class UserAreaComponent implements OnInit {
  public userName = '';
  public message;

  constructor(
    private authService: AuthenticationService,
    private navigation: NavigationService,
    private dbService: DatabaseService,
    private messagingService: NotificationService
  ) { }

  ngOnInit() {
    var userId = 'abc'
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

  show(){
    this.dbService.$item.subscribe((a)=>{
      console.log(a)
    })
  }

  public getUserName(): void{

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

  public getState(outlet: any): string {
    return outlet.activatedRouteData.state;
  }

}
