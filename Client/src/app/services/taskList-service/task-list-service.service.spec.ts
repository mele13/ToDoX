import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list-service.service';

describe('TaskListServiceService', () => {
  let service: TaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
