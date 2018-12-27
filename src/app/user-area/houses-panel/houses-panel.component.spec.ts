import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesPanelComponent } from './houses-panel.component';

describe('HousesPanelComponent', () => {
  let component: HousesPanelComponent;
  let fixture: ComponentFixture<HousesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
