import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})
export class UserManagementComponent implements OnInit {
  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode: string;
  actionCode: string
  actionCodeChecked: any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(params => {
      if (!params) {
        this.router.navigate(['/home'])
      }
      this.mode = params['mode'];
      this.actionCode = params['oobCode'];
      if(params['mode'] === 'resetPassword'){
        this.getAuth().verifyPasswordResetCode(this.actionCode)
        .then(email => {
          this.actionCodeChecked = true;
          this.getAuth().confirmPasswordReset(this.actionCode, '1754712df')
          .then(resp => console.log('resetou:', resp))
          .catch(e => console.log(e))
        }).catch(e => {
          // Invalid or expired action code. Ask user to try to reset the password
          // again.
          alert(e);
          this.router.navigate(['/']);
        });
      }
    })


  }

  getAuth() {
    return this.afAuth.auth;
  }

}
