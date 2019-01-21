import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NavigationService } from '../_services/navigation.service';
import { DatabaseService } from '../_services/database.service';
import { NotificationService } from '../_services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.less']
})
export class UserAreaComponent implements OnInit, OnDestroy {
  public userName = '';
  public message;
  private nameSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private navigation: NavigationService,
    private dbService: DatabaseService,
    private messagingService: NotificationService
  ) { }

  ngOnInit() {
    this.setTokenForNotifications();
    this.getUserName();
  }

  ngOnDestroy(): void{
    this.nameSubscription && this.nameSubscription.unsubscribe();
  }

  public setTokenForNotifications(): void{
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage
  }

  public getUserName(): void{
    this.nameSubscription = this.dbService.$name.subscribe( name => {
      this.userName = name;
    })
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

  public send(){
    //call this method after register a house this.messagingService.sendNotification();
  }

}
