import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessPanelComponent } from './acess-panel.component';

describe('AcessPanelComponent', () => {
  let component: AcessPanelComponent;
  let fixture: ComponentFixture<AcessPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
