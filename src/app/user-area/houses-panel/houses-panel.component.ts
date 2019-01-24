import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-houses-panel',
  templateUrl: './houses-panel.component.html',
  styleUrls: ['./houses-panel.component.less']
})
export class HousesPanelComponent implements OnInit {
  public houseForm: FormGroup;
  public fb: FormBuilder;

  constructor() { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.houseForm = this.fb.group({
      title: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      squareMeters: new FormControl(null, Validators.required),
      rooms: new FormControl(null, Validators.required),
      suite: new FormControl(null, Validators.required),
      parkingSpaces: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      images: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required)
    },

    )
  }

}
