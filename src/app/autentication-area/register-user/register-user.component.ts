import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userFactory } from 'src/app/_utils/userFactory';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { REGEX } from 'src/app/_utils/constants';
import { matchPasswordValidator } from 'src/app/_utils/validators';

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
  public formulario: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(REGEX.email)]),
    senha: new FormControl(null, [Validators.required, Validators.pattern(REGEX.password)]),
    confirmarSenha: new FormControl(null,  [ Validators.required, matchPasswordValidator('senha')])
  });
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
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
    })
    .catch((error: Error)=>{
      this.authService.closeLoadingOverlay();
      alert('falha')
    })
  }

  public getDataToCreateNewUser(): User{
    return userFactory(this.formulario.value);
  }




}
