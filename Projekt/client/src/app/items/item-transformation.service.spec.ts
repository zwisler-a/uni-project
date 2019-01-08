import { TestBed } from '@angular/core/testing';

import { ItemTransformationService } from './item-transformation.service';

describe('ItemTransformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemTransformationService = TestBed.get(ItemTransformationService);
    expect(service).toBeTruthy();
  });
});
