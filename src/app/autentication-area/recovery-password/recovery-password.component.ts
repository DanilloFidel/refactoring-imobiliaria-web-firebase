import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ErrorService } from 'src/app/_services/error.service';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserHelperService } from 'src/app/_services/user-helper.service';
import { HELPERTEXTS } from 'src/app/_utils/constants';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.less'],
  animations: [ BANNERENTER ]
})
export class RecoveryPasswordComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public formPanelTransformState: string = 'criado';
  public passwordHide: boolean = true;
  public formulario: FormGroup;
  public fileNameDialogRef: MatDialogRef<ModalComponent>;


  constructor(
    private fb: FormBuilder,
    private afs: AngularFireAuth,
    private errorService: ErrorService,
    private snackBarService: SnackBarService,
    private spinner: NgxSpinnerService,
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userHelper.$helperTexts.next(HELPERTEXTS.recovery);
  }

  private createForm(){
    this.formulario = this.fb.group({
      email: new FormControl('', [Validators.required])
    });
  }

  public formSubmit(){
    this.spinner.show();
    let email = this.getEmailValue();
    this.afs.auth.sendPasswordResetEmail(email)
      .then(()=>{
        this.spinner.hide();
        this.formulario.reset();
        this.snackBarService.openSnackBar('Recupere sua senha através do link que te enviamos!','Enviado');
        this.changeToLoginPanel();
      })
      .catch((error)=>{
        this.spinner.hide();
        this.errorService.checkErrorMsg(error.code)
      })
  }

  public changeToLoginPanel(): void{
    this.showFormPanel.emit('login')
  }

  public getEmailValue(): string{
    return this.formulario.value.email
  }

}
