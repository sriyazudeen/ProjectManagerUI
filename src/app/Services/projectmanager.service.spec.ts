import { TestBed, inject } from '@angular/core/testing';

import { ProjectmanagerService } from './projectmanager.service';

describe('ProjectmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectmanagerService]
    });
  });

  it('should be created', inject([ProjectmanagerService], (service: ProjectmanagerService) => {
    expect(service).toBeTruthy();
  }));
});
