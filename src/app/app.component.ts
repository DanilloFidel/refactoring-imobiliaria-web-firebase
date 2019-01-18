import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NotificationService } from './_services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'imobiliaria-web';
  items = ['First', 'Second', 'Third', 'Fourth'];
  public msg

  constructor(
    private msgService: NotificationService
  ){

  }

  public ngOnInit(): void{
    const userId = 'user001';
    this.msgService.requestPermission(userId);
    this.msgService.receiveMessage();
    this.msg = this.msgService.currentMessage;
    console.log(this.msg)
  }

  /*
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
  */

}
