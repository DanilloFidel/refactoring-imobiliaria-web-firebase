import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesAreaComponent } from './houses-area.component';

describe('FavoriteAreaComponent', () => {
  let component: HousesAreaComponent;
  let fixture: ComponentFixture<HousesAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
