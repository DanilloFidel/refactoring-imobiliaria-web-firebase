import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConfirmedComponent } from './not-confirmed.component';

describe('NotConfirmedComponent', () => {
  let component: NotConfirmedComponent;
  let fixture: ComponentFixture<NotConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
