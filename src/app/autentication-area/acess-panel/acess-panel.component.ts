import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { BANNERENTER } from 'src/app/_animations/animation-banner';
import { Subscription } from 'rxjs';
import { UserHelperService } from 'src/app/_services/user-helper.service';

@Component({
  selector: 'app-acess-panel',
  templateUrl: './acess-panel.component.html',
  styleUrls: ['./acess-panel.component.less'],
  animations: [ BANNERENTER ],
  encapsulation: ViewEncapsulation.None
})
export class AcessPanelComponent implements OnInit {
  public formPanelTransformState: string = 'criado';
  public title: string;
  public titleSubscription: Subscription;

  constructor(
    private userHelper: UserHelperService
  ) { }

  ngOnInit() {
    this.getTitle();
  }

  public getTitle(): void{
    this.titleSubscription = this.userHelper.$helperTexts
      .subscribe((resp)=>{
        this.title = resp;
      })
  }

}
