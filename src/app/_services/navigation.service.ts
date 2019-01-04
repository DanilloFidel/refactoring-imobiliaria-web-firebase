import { Injectable } from '@angular/core';
import { Router, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private route: Router
  ) { }

  public navigateToRoute(path: string, params?: Params): void{
    this.route.navigate([path],{queryParams: params});
  }

}
