import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ErrorService } from 'src/app/_services/error.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { CustomValidators } from 'src/app/_utils/validators';
import { REGEX, PATHS, HELPERTEXTS} from 'src/app/_utils/constants';
import { NavigationService } from 'src/app/_services/navigation.service';
import { UserHelperService } from 'src/app/_services/user-helper.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public invalidCode: boolean

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private navigation: NavigationService,
    private userHelper: UserHelperService,
    private snackBar: SnackBarService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userHelper.checkUrlCodeIsValid()
      .then(()=>{
        this.userHelper.$helperTexts.next(HELPERTEXTS.changePwdTitle);
      })
      .catch(()=>{
        this.invalidCode = true;
        this.setdDisableForm();
      })
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

  public sendNewPassword(): void{
    this.userHelper.sendNewPasswordToFirebase(this.getNewPassword())
      .then(()=>{
        this.snackBar.openSnackBar(HELPERTEXTS.sucess, HELPERTEXTS.pwdChangeSucess);
        this.redirectToAnotherPanel('login');
        this.spinner.hide();
      })
  }


  public setdDisableForm(): void{
    this.formulario.controls.senha.disable();
    this.formulario.controls.confirmarSenha.disable();
  }

  public redirectToAnotherPanel(panelType: string): void{
    this.showFormPanel.emit(panelType);
    this.navigation.navigateToRoute(PATHS.areaDeAutenticacao, {});
  }


}
