import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {


  constructor(
    private authService: AuthenticationService,
    private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<ModalComponent>
  ) { }

  ngOnInit() {
  }

  public resendEmailLink(): void{
    this.authService.sendEmailVerification().then(()=>{
      this.dialogRef.close();
      this.snackBar.openSnackBar('O Link foi reenviado!', 'Concluido')
    })
  }

}
