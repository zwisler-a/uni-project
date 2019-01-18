import { TestBed } from '@angular/core/testing';

import { ItemErrorService } from './item-error.service';

describe('ItemErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemErrorService = TestBed.get(ItemErrorService);
    expect(service).toBeTruthy();
  });
});
