import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HELPERTEXTS, PATHS } from 'src/app/_utils/constants';
import { NavigationService } from 'src/app/_services/navigation.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserHelperService } from 'src/app/_services/user-helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-not-confirmed',
  templateUrl: './not-confirmed.component.html',
  styleUrls: ['./not-confirmed.component.less']
})
export class NotConfirmedComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public linkCodeValid: boolean;
  public btnSendDisabled: boolean;

  constructor(
    private authService: AuthenticationService,
    private userHelper: UserHelperService,
    private spinner: NgxSpinnerService,
    private snackBar: SnackBarService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.userHelper.$helperTexts.next(HELPERTEXTS.emailNotConfirmAlert);
    this.getEmailStatus();
    console.log(this.userHelper.getAuth())
  }

  public logoutUser(): void {
    this.authService.logout();
    this.showFormPanel.emit('login');
  }

  private getEmailStatus(): void {
    this.userHelper.$linkCodeValid
      .subscribe((resp: boolean) => {
        this.linkCodeValid = resp;
      })
  }

  public sendEmail(): void {
    this.userHelper.sendNewConfirmationEmail()
      .then((err) => {
        if (err) {
          this.snackBar.openSnackBar(HELPERTEXTS.loginAlert, 'Atenção');
          this.returnToLogin();
        } else {
          this.userHelper.$helperTexts.next(HELPERTEXTS.emailConfirmSend);
          this.disableButton();
        }
        this.spinner.hide();
      })
  }

  private returnToLogin(): any {
    this.navigation.navigateToRoute(PATHS.areaDeAutenticacao, {});
    this.showFormPanel.emit('login');
  }

  public disableButton(): void {
    this.btnSendDisabled = true;
  }

  public validateAcc(): void{
    this.userHelper.applyCode()
      .then(()=>{
        this.navigation.navigateToRoute(PATHS.areaDoUsuario);
      })
      .catch(()=>{
        this.snackBar.openSnackBar('Login expirado', 'Atenção');
          this.returnToLogin();
      })
      .then(()=>this.spinner.hide());
  }


}
-
'             '
