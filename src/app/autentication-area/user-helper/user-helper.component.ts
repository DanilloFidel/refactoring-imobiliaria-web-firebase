import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { REGEX, resetPwdFormTextObj, queryParams } from 'src/app/_utils/constants';
import { CustomValidators } from 'src/app/_utils/validators';
import { ErrorService } from 'src/app/_services/error.service';
import { BackEndFirebaseService } from 'src/app/_services/back-end-firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { NavigationService } from 'src/app/_services/navigation.service';

@Component({
  selector: 'app-user-helper',
  templateUrl: './user-helper.component.html',
  styleUrls: ['./user-helper.component.less'],
  animations: [ BANNERENTER ]
})
export class UserHelperComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public formPanelTransformState: string = 'criado';
  public formulario: FormGroup;
  public errors: {[key: string]: string} = {};
  public passwordHide: boolean = true;
  public panelText = resetPwdFormTextObj;

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private bckedService: BackEndFirebaseService,
    private afs: AngularFireAuth,
    private snackService: SnackBarService,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.createForm();
    this.bckedService.panelText.subscribe(response =>{
        response.error && this.setdDisableForm();
        this.panelText = response;
    })
  }


  private createForm(){
    this.formulario = this.fb.group({
      senha: new FormControl('', [Validators.required, Validators.pattern(REGEX.password) ]),
      confirmarSenha: new FormControl('',  [CustomValidators.matchPasswordValidator('senha')])
    });
    this.formulario.statusChanges.subscribe(()=>{
    this.errors = this.errorService.updateErrorMessages(this.formulario)
    })
  }

  public getNewPassword(): string{
    return this.formulario.value.senha;
  }

  public resetPasswordValidate(): void{
    this.showFormPanel.emit('login');
    this.navigation.navigateToRoute('./area-de-autenticacao',{});
  }

  public checkEmailLink(): void{
    if(!this.panelText.error){
      this.changePassword();
    }else{
      this.resendEmailLink();
    }
  }

  public setdDisableForm(): void{
    this.formulario.controls.senha.disable();
    this.formulario.controls.confirmarSenha.disable();
  }

  public changePassword(): void{
    this.bckedService.showLoading();
    this.bckedService.resetPassword(this.getNewPassword())
    .then(()=>{
      this.resetPasswordValidate();
      this.bckedService.hideLoading();
    });
  }

  public resendEmailLink(): void{
    this.showFormPanel.emit('recovery');
  }


}
