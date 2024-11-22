import { TestBed } from '@angular/core/testing';
import { ClientService } from '../services/client.service';


describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
  });

  it('should retrieve clients', () => {
    const clients = service.getClients();
    expect(clients).toBeTruthy();
  });
});