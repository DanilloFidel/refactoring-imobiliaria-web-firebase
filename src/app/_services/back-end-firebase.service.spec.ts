import { TestBed } from '@angular/core/testing';

import { BackEndFirebaseService } from './back-end-firebase.service';

describe('BackEndFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackEndFirebaseService = TestBed.get(BackEndFirebaseService);
    expect(service).toBeTruthy();
  });
});
