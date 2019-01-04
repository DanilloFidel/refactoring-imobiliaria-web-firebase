import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ErrorService } from 'src/app/_services/error.service';
import { NavigationService } from 'src/app/_services/navigation.service';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

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
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(){
    this.formulario = this.fb.group({
      email: new FormControl('', [Validators.required])
    });
  }

  public formSubmit(){
    let email = this.getEmailValue();
    this.afs.auth.sendPasswordResetEmail(email)
      .then(()=>{
        this.formulario.reset();
        this.snackBarService.openSnackBar('Recupere sua senha através do link que te enviamos!','Enviado');
        this.changeToLoginPanel();
        //deslogar
      })
      .catch((error)=>{
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
