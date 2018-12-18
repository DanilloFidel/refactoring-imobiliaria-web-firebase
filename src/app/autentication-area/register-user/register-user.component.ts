import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less'],
  animations: [ BANNERENTER ]
})
export class RegisterUserComponent implements OnInit {
  @Output() public showFormPanel: EventEmitter<string> = new EventEmitter<string>()
  public formPanelTransformState: string = 'criado';
  public passwordHide: boolean = true
  constructor() { }

  ngOnInit() {
  }

  public changeToLoginUserPanel(): void{
    this.showFormPanel.emit('login')
  }

}
