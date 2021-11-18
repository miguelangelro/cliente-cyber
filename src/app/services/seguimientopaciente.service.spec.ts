import { TestBed } from '@angular/core/testing';

import { SeguimientopacienteService } from './seguimientopaciente.service';

describe('SeguimientopacienteService', () => {
  let service: SeguimientopacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguimientopacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
