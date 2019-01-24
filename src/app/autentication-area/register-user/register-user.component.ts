import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { userFactory } from 'src/app/_utils/userFactory';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { REGEX, HELPERTEXTS } from 'src/app/_utils/constants';
import { CustomValidators } from 'src/app/_utils/validators';
import { ErrorService } from 'src/app/_services/error.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { UserHelperService } from 'src/app/_services/user-helper.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less'],
  animations: [BANNERENTER]
})
export class RegisterUserComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>()
  public formPanelTransformState: string = 'criado';
  public passwordHide: boolean = true;
  public email = false;
  public formulario: FormGroup;
  public errors: { [key: string]: string } = {};

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private errorService: ErrorService,
    private snackBarService: SnackBarService,
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userHelper.$helperTexts.next(HELPERTEXTS.register);
  }

  ngOnDestroy() {

  }

  private createForm() {
    this.formulario = this.fb.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern(REGEX.name)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX.email)
      ]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(REGEX.password)]),
      confirmarSenha: new FormControl('', [CustomValidators.matchPasswordValidator('senha')])
    });
    this.formulario.valueChanges.subscribe(() => {
      this.errors = this.errorService.updateErrorMessages(this.formulario);
    })
  }

  public changeToLoginPanel(): void {
    this.showFormPanel.emit('login')
  }

  public setNewUserWithService(): void {
    this.authService.registerNewUserInFirebase(this.getDataToCreateNewUser())
      .then(() => {
        this.formulario.reset();
        this.snackBarService.openSnackBar(HELPERTEXTS.sucess, HELPERTEXTS.registredSucess);
        this.changeToLoginPanel();
      })
      .catch((errorMsg) => {
        this.errorService.checkErrorMsg(errorMsg);
      })
  }

  public getDataToCreateNewUser(): User {
    return userFactory(this.formulario.value);
  }

}
