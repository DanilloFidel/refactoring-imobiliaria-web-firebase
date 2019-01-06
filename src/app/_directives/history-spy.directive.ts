import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[historySpy]'
})
export class HistorySpyDirective {

  constructor() { }

  @HostListener('location:onpopstate')
  historyEvent(event: any): void{
    alert('opa!')
  }

  @HostListener('window:keyup', ['$event'])
  atata(event: any): void{
    alert('epa!')
  }



}
