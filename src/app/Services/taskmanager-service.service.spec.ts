import { TestBed, inject } from '@angular/core/testing';

import { TaskManagerService } from './taskmanager-service.service';

describe('TaskManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskManagerService]
    });
  });

  it('should be created', inject([TaskManagerService], (service: TaskManagerService) => {
    expect(service).toBeTruthy();
  }));
});
