import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-pop-up',
  templateUrl: '../pop-up/pop-up.component.html',
  styleUrls: ['../pop-up/pop-up.component.less']
})
export class PopUpComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
