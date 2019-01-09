import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorService } from '../_services/error.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit{


  constructor(
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private spinner: NgxSpinnerService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
  }

  public resendEmailLink(): void{
    this.spinner.show();
    this.authService.sendEmailVerification()
      .then(()=>{
        this.spinner.hide();
        this.dialogRef.close();
        this.snackBar.openSnackBar('O Link foi reenviado!', 'Concluido')
      })
      .catch((err)=>{
        this.dialogRef.close();
        this.errorService.checkErrorMsg(err);
        this.spinner.hide();
      })
  }

}
