import { TestBed } from '@angular/core/testing';

import { UserHelperService } from './user-helper.service';

describe('UserHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserHelperService = TestBed.get(UserHelperService);
    expect(service).toBeTruthy();
  });
});
