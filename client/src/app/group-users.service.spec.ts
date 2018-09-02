import { TestBed, inject } from '@angular/core/testing';

import { GroupUsersService } from './group-users.service';

describe('GroupUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupUsersService]
    });
  });

  it('should be created', inject([GroupUsersService], (service: GroupUsersService) => {
    expect(service).toBeTruthy();
  }));
});
