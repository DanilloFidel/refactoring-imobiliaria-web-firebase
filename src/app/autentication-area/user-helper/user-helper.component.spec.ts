import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHelperComponent } from './user-helper.component';

describe('UserHelperComponent', () => {
  let component: UserHelperComponent;
  let fixture: ComponentFixture<UserHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
