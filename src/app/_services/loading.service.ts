import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loader: NgxSpinnerService) { }

  public showLoadingOverlay(): void{
    this.loader.show();
  }

  public hideLoadingOverlay(): void{
    this.loader.hide();
  }
}
