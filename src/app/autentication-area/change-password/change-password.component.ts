import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ErrorService } from 'src/app/_services/error.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CustomValidators } from 'src/app/_utils/validators';
import { REGEX, PATHS } from 'src/app/_utils/constants';
import { NavigationService } from 'src/app/_services/navigation.service';
import { UserHelperService } from 'src/app/_services/user-helper.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public formulario: FormGroup;
  public passwordHide: boolean = true;
  public fileNameDialogRef: MatDialogRef<ModalComponent>;
  public errors: any;

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private navigation: NavigationService,
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.showFormPanel.emit('login');
  }

  private createForm(){
    this.formulario = this.fb.group({
      senha: new FormControl('', [Validators.required, Validators.pattern(REGEX.password) ]),
      confirmarSenha: new FormControl('',  [CustomValidators.matchPasswordValidator('senha')])
    });
    this.formulario.statusChanges.subscribe(()=>{
    this.errors = this.errorService.updateErrorMessages(this.formulario);
    })
  }

  public changeToLoginPanel(): void{
    this.showFormPanel.emit('login')
  }

  public getEmailValue(): string{
    return this.formulario.value.email
  }

  public getNewPassword(): string{
    return this.formulario.value.senha;
  }

  public resetPasswordValidate(): void{
    this.showFormPanel.emit('login');
    this.navigation.navigateToRoute('./area-de-autenticacao',{});
  }

  public setdDisableForm(): void{
    this.formulario.controls.senha.disable();
    this.formulario.controls.confirmarSenha.disable();
  }


  public resendEmailLink(): void{
    this.showFormPanel.emit('recovery');
  }

  public backToLoginPanel(): void{
    this.userHelper.$params.next(null);
    this.navigation.navigateToRoute(PATHS.areaDeAutenticacao);
  }


}
