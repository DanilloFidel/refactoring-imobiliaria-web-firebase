import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticationAreaComponent } from './autentication-area.component';

describe('AutenticationAreaComponent', () => {
  let component: AutenticationAreaComponent;
  let fixture: ComponentFixture<AutenticationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticationAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
