import { TestBed } from '@angular/core/testing';

import { BaseHttpInterceptor } from './base-http-intercept.interceptor';

describe('BaseHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BaseHttpInterceptor = TestBed.inject(BaseHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
