import { Injectable } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  public navigateToRoute(path: string, params?: Params): void{
    this.route.navigate([path],{queryParams: params});
  }
}
