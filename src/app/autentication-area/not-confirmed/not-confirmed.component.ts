import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HELPERTEXTS, PATHS } from 'src/app/_utils/constants';
import { NavigationService } from 'src/app/_services/navigation.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-not-confirmed',
  templateUrl: './not-confirmed.component.html',
  styleUrls: ['./not-confirmed.component.less']
})
export class NotConfirmedComponent implements OnInit {
  public bodyMsg: string = HELPERTEXTS.emailNotConfirmAlert;
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public logoutUser(): void{
    this.authService.logout();
    this.showFormPanel.emit('login');
  }

}
