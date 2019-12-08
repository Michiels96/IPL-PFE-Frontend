import { TestBed, async, inject } from '@angular/core/testing';

import { KidAuthGuard } from './kid-auth.guard';

describe('KidAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KidAuthGuard]
    });
  });

  it('should ...', inject([KidAuthGuard], (guard: KidAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
