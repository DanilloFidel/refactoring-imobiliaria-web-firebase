import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public loggedState: any;

  constructor(
    private afs: AngularFireAuth
    ) { }

  ngOnInit() {
    this.getLoggedState();
  }

  public getLoggedState(): void{
    this.afs.auth.onAuthStateChanged((data)=>{
      this.loggedState = data;
    })
  }





}
