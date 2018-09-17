import { TestBed, inject } from '@angular/core/testing';

import { GroupChannelsService } from './group-channels.service';

describe('GroupChannelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupChannelsService]
    });
  });

  it('should be created', inject([GroupChannelsService], (service: GroupChannelsService) => {
    expect(service).toBeTruthy();
  }));
});
