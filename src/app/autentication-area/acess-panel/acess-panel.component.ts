import { Component, OnInit } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';

@Component({
  selector: 'app-acess-panel',
  templateUrl: './acess-panel.component.html',
  styleUrls: ['./acess-panel.component.less'],
  animations: [ BANNERENTER ]
})
export class AcessPanelComponent implements OnInit {
  public formPanelTransformState: string = 'criado';
  constructor() { }

  ngOnInit() {
  }

}
