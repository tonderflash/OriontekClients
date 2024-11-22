import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from 'src/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      addresses: [
        { id: 1, street: '123 Main St', city: 'Santo Domingo', state: 'SD', zip: '10101' },
        { id: 2, street: '456 Elm St', city: 'Santiago', state: 'ST', zip: '20202' },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987654321',
      addresses: [
        { id: 3, street: '789 Oak St', city: 'Punta Cana', state: 'PC', zip: '30303' },
      ],
    },
  ];

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }

  addClient(client: Client): void {
    this.clients.push(client);
  }

  updateClient(client: Client): void {
    const index = this.clients.findIndex((c) => c.id === client.id);
    if (index > -1) this.clients[index] = client;
  }

  /**
   * Generate and add a random client.
   */
  generateRandomClient(): void {
    const randomNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    const randomEmails = [
      'alice@example.com',
      'bob@example.com',
      'charlie@example.com',
      'diana@example.com',
      'eve@example.com',
    ];
    const randomPhone = Math.floor(Math.random() * 900000000) + 100000000;
    const randomAddresses = [
      {
        id: 1,
        street: `${Math.floor(Math.random() * 1000)} Main St`,
        city: 'Random City',
        state: 'RC',
        zip: `${Math.floor(10000 + Math.random() * 90000)}`,
      },
    ];

    const newClient: Client = {
      id: this.clients.length + 1,
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      email: randomEmails[Math.floor(Math.random() * randomEmails.length)],
      phone: randomPhone.toString(),
      addresses: randomAddresses,
    };

    this.addClient(newClient);
    console.log('Random client added:', newClient);
  }
}