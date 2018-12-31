import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.less']
})
export class UserAreaComponent implements OnInit {
  public greetings = 'Bom dia, Usuário!'
  constructor(
    private route: Router
  ) { }

  ngOnInit() {

  }

  public logout(): void{
    this.route.navigate(['/']);
  }

  public getUserType(): number{
    return
  }

  public checkUserType(): void{

  }

}
