import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ClientService } from '../services/client.service';
import { Address, Client } from 'src/models/client.model';
import { AddressModalComponent } from '../address-modal/address-modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = []; 
  displayedClients: Client[] = [];
  pageSize = 5;
  currentPage = 0;
  totalClients = 0; 

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data.map(client => ({ ...client, expanded: false })); 
      this.totalClients = this.clients.length;
      this.updateDisplayedClients();
    });
  }

  updateDisplayedClients(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedClients = this.clients.slice(startIndex, endIndex);
  }

  // Handles page changes from the paginator
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedClients();
  }


  /**
   * Alterna el estado de expansión de las direcciones del cliente.
   */
  toggleAddressExpansion(client: Client): void {
    client.expanded = !client.expanded; // Cambia el estado de expansión
  }
  openAddressModal(client: Client): void {
    this.dialog.open(AddressModalComponent, {
      width: '500px',
      data: { addresses: client.addresses },
    });
  }
  /**
   * Maneja la acción seleccionada desde el selector.
   */
  onActionSelect(event: Event, client: Client): void {
    const action = (event.target as HTMLSelectElement).value;

    switch (action) {
      case 'addAddress':
        this.addAddress(client);
        break;
      case 'editClient':
        this.editClient(client);
        break;
      case 'deleteClient':
        this.deleteClient(client);
        break;
      default:
        console.warn('Action not implemented:', action);
    }

    // Resetear el valor del selector después de realizar la acción
    (event.target as HTMLSelectElement).value = '';
  }

  addRandomClient(): void {
    this.clientService.generateRandomClient(); // Add a random client to the service
  
    // Refresh the client list and update pagination
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      this.totalClients = data.length; // Update the total number of clients
      this.updateDisplayedClients(); // Refresh the paginated displayed clients
    });
  }

  addAddress(client: Client): void {
    const dialogRef = this.dialog.open(AddressModalComponent, {
      width: '400px',
      data: { clientId: client.id },
    });
  
    dialogRef.afterClosed().subscribe((result: Address) => {
      if (result) {
        result.id = client.addresses.length + 1; // Generar ID único
        client.addresses.push(result); // Agregar la dirección al cliente
      }
    });
  }

  /**
   * Editar los datos de un cliente.
   */
  editClient(client: Client): void {
    const name = prompt('Edit client name:', client.name);
    const email = prompt('Edit client email:', client.email);
    const phone = prompt('Edit client phone:', client.phone);

    if (name && email && phone) {
      client.name = name;
      client.email = email;
      client.phone = phone;

      console.log('Client updated:', client);
    } else {
      console.warn('Edit canceled or incomplete');
    }
  }   

  /**
   * Eliminar un cliente de la lista.
   */
  deleteClient(client: Client): void {
    const confirmed = confirm(
      `Are you sure you want to delete ${client.name}?`
    );

    if (confirmed) {
      this.clients = this.clients.filter((c) => c.id !== client.id);
      console.log('Client deleted:', client);
    }
  }
}