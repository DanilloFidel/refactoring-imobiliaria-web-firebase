import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autentication-area',
  templateUrl: './autentication-area.component.html',
  styleUrls: ['./autentication-area.component.less']
})
export class AutenticationAreaComponent implements OnInit {
  public showRegisterFormPanel: boolean;
  constructor() { }

  ngOnInit() {
  }

  public showFormPanel(evento: string): void{
    this.showRegisterFormPanel = evento === 'register' ? true: false;
  }

}
