import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErrorService } from 'src/app/_services/error.service';
import { NavigationService } from 'src/app/_services/navigation.service';
import { UserHelperService } from 'src/app/_services/user-helper.service';
import { HELPERTEXTS } from 'src/app/_utils/constants';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.less'],
  animations: [ BANNERENTER ]
})
export class LoginUserComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public formPanelTransformState: string = 'criado';
  public passwordHide: boolean = true;
  public formulario: FormGroup;
  public color = 'green'

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private errorService: ErrorService,
    private navigation: NavigationService,
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userHelper.$helperTexts.next(HELPERTEXTS.login);
  }

  public changeToRegisterUserPanel(): void{
    this.showFormPanel.emit('register');
  }

  public changeToRecoveryPassword(): void{
    this.showFormPanel.emit('recovery');
  }

  private createForm(){
    this.formulario = this.fb.group({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  public formSubmit(){
    this.authService.authenticateUser(
      this.formulario.value.email,
      this.formulario.value.senha
    ).then(()=>{
      this.redirectToLogin();
    })
    .catch((errorMsg) => {
      !errorMsg && this.showFormPanel.emit('verifyEmail');
      errorMsg && this.errorService.checkErrorMsg(errorMsg)
    })
  }

  public redirectToLogin(): void{
    this.navigation.navigateToRoute('./area-do-usuario');
  }


}
