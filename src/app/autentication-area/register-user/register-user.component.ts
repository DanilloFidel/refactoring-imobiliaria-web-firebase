import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { userFactory } from 'src/app/_utils/userFactory';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { REGEX } from 'src/app/_utils/constants';
import { CustomValidators } from 'src/app/_utils/validators';
import { ErrorService } from 'src/app/_services/error.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less'],
  animations: [ BANNERENTER ]
})
export class RegisterUserComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>()
  public formPanelTransformState: string = 'criado';
  public passwordHide: boolean = true;
  public email = false;
  public formulario: FormGroup;
  public errors: {[key: string]: string} = {};
  public teste: boolean;
  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private errorService: ErrorService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(){

  }

  private createForm(){
    this.formulario = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(REGEX.email)
      ]),
      senha: new FormControl('', [Validators.required, Validators.pattern(REGEX.password) ]),
      confirmarSenha: new FormControl('',  [CustomValidators.matchPasswordValidator('senha')])
    });
    this.formulario.statusChanges.subscribe(()=>{
    this.errors = this.errorService.updateErrorMessages(this.formulario)
    })
  }

  public changeToLoginUserPanel(): void{
    this.showFormPanel.emit('login')
  }

  public setNewUserWithService(): void{
    this.authService.openLoadingOverlay();
    this.authService.registerNewUserInFirebase(this.getDataToCreateNewUser())
    .then(()=>{
      this.authService.closeLoadingOverlay();
      this.formulario.reset();
      this.snackBarService.openSnackBar('Agora voçê pode acessar seu painel!','Cadastrado');
      this.changeToLoginUserPanel();
    })
    .catch((errorMsg)=>{
      this.errorService.checkErrorMsg(errorMsg);
    })
  }

  public getDataToCreateNewUser(): User{
    return userFactory(this.formulario.value);
  }

}
