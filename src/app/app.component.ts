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

  constructor(

  ){

  }

  public ngOnInit(): void{


  }

}
