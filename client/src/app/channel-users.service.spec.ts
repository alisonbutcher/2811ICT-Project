import { TestBed, inject } from '@angular/core/testing';

import { ChannelUsersService } from './channel-users.service';

describe('ChannelUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelUsersService]
    });
  });

  it('should be created', inject([ChannelUsersService], (service: ChannelUsersService) => {
    expect(service).toBeTruthy();
  }));
});
