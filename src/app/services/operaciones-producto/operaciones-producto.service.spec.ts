import { TestBed } from '@angular/core/testing';

import { OperacionesProductoService } from './operaciones-producto.service';

describe('OperacionesProductoService', () => {
  let service: OperacionesProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionesProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
