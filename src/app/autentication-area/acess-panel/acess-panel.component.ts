import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { UserPanel } from 'src/app/_utils/interfaces';

@Component({
  selector: 'app-acess-panel',
  templateUrl: './acess-panel.component.html',
  styleUrls: ['./acess-panel.component.less'],
  animations: [ BANNERENTER ]
})
export class AcessPanelComponent implements OnInit {
  public formPanelTransformState: string = 'criado';
  public userPanel: UserPanel;
  constructor() { }

  ngOnInit() {
    this.userPanel = {
      firstTitle: 'TITULO RELATIVO'
    }
  }

}
