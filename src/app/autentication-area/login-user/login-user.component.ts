import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.less'],
  animations: [ BANNERENTER ]
})
export class LoginUserComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>();
  public formPanelTransformState: string = 'criado';
  public passwordHide: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  public changeToRegisterUserPanel(): void{
    this.showFormPanel.emit('register')
  }

}
