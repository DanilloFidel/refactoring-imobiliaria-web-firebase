import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentChecked } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { NavigationService } from '../_services/navigation.service';
import { DatabaseService } from '../_services/database.service';
import { NotificationService } from '../_services/notification.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import switchScroll from '../_utils/global.functions';


@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.less']
})
export class UserAreaComponent implements OnInit, OnDestroy {
  public userName = '';
  public message;
  private nameSubscription: Subscription;
  public loading = true;


  constructor(
    private authService: AuthenticationService,
    private navigation: NavigationService,
    private dbService: DatabaseService,
    private messagingService: NotificationService,
    private angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    switchScroll('hidden');
    this.setTokenForNotifications();
    this.authSubscribe()
      .then((email) => [
        this.getUserData(email)
      ]);
    this.nameSubscription = this.dbService.$userName.subscribe(name => {
      if (name) {
        this.loading = false;
        this.userName = name;
      }
    });
  }


  ngOnDestroy(): void {
    this.nameSubscription && this.nameSubscription.unsubscribe();
    switchScroll();
  }

  private authSubscribe(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.authState.subscribe(
        (res) => {
          resolve(res.email);
        }
      )
    })
  }

  public setTokenForNotifications(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage
  }

  public getUserData(email: string): void {
    this.dbService.searchUserInFirestore(email);
  }

  public logout(): void {
    this.authService.logout();
    this.navigation.navigateToRoute('/');
  }

  public getUserType(): number {
    return
  }

  public checkUserType(): void {

  }

  public getState(outlet: any): string {
    return outlet.activatedRouteData.state;
  }

  public send() {
    //call this method after register a house this.messagingService.sendNotification();
  }

}
