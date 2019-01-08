import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import isEmpty from 'lodash/isEmpty';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {
  public $params = new BehaviorSubject<Params>(null);

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.$params.next(this.getParams());
  }

  public getParams(): any {
    let urlParams;
    this.activatedRoute.queryParams
      .pipe()
      .subscribe((params) => {
       urlParams = params
      })
      return isEmpty(urlParams) ?  null : urlParams;
  }
}
