import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ErrorService } from 'src/app/_services/error.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { CustomValidators } from 'src/app/_utils/validators';
import { REGEX, PATHS, resetPwdFormTextObj } from 'src/app/_utils/constants';
import { NavigationService } from 'src/app/_services/navigation.service';
import { UserHelperService } from 'src/app/_services/user-helper.service';
import { BackEndFirebaseService } from 'src/app/_services/back-end-firebase.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public formPanelTransformState: string = 'criado';
  public formulario: FormGroup;
  public errors: {[key: string]: string} = {};
  public passwordHide: boolean = true;
  public subtitle = {}

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private bckedService: BackEndFirebaseService,
    private navigation: NavigationService,
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.createForm();
  }


  private createForm(){
    this.formulario = this.fb.group({
      senha: new FormControl('', [Validators.required, Validators.pattern(REGEX.password) ]),
      confirmarSenha: new FormControl('',  [CustomValidators.matchPasswordValidator('senha')])
    });
    this.formulario.statusChanges.subscribe((resp)=>{
    this.errors = this.errorService.updateErrorMessages(this.formulario)
    })
  }

  public getNewPassword(): string{
    return this.formulario.value.senha;
  }


  public setdDisableForm(): void{
    this.formulario.controls.senha.disable();
    this.formulario.controls.confirmarSenha.disable();
  }


  public resendEmailLink(): void{
    this.showFormPanel.emit('recovery');
  }

  public backToLoginPanel(): void{
    this.showFormPanel.emit('login');
    this.navigation.navigateToRoute(PATHS.areaDeAutenticacao);
  }


}
