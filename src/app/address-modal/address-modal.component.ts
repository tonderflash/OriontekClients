import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/models/client.model';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css'],
})
export class AddressModalComponent {
  address: Address = {
    id: 0,
    street: '',
    city: '',
    state: '',
    zip: '',
  };

  isViewMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientId: number; addresses?: Address[] }
  ) {
    this.isViewMode = !!data.addresses; 
  }


  onSubmit(): void {
    this.dialogRef.close(this.address);
  }

  /**
   * Cerrar el modal sin realizar cambios.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}