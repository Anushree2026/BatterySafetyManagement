
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShipService } from './services/ship.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  shipName = '';
  shipType = '';
  imoNumber = '';

  // Separate values for editing a ship in the table
editShipName = '';
editShipType = '';
editImoNumber = '';

  ships: any[] = [];

  // Stores the ID of the ship being edited
  editingShipId: number | null = null;

  constructor(private shipService: ShipService) {}

  ngOnInit() {
    this.loadShips();
  }

  loadShips() {
    this.shipService.getShips().subscribe({
      next: (data) => {
        this.ships = data;
      },
      error: (error) => {
        console.error('Error loading ships:', error);
      }
    });
  }

  addShip() {

    if (!this.shipName || !this.shipType || !this.imoNumber) {
      alert('Please fill all fields');
      return;
    }

    const newShip = {
      shipName: this.shipName,
      shipType: this.shipType,
      imoNumber: this.imoNumber
    };

    this.shipService.addShip(newShip).subscribe({
     next: () => {
  alert('Ship registered successfully!');
  window.location.reload();
},
      error: (error) => {
        console.error('Error registering ship:', error);
        alert('Unable to register ship.');
      }
    });
  }

  // Load selected ship details into the form
  editShip(ship: any) {
   
  this.editingShipId = ship.shipId;

  this.editShipName = ship.shipName;
  this.editShipType = ship.shipType;
  this.editImoNumber = ship.imoNumber;

  }

  // Save updated ship details
  updateShip() {
  if (this.editingShipId === null) {
    return;
  }

  if (!this.editShipName || !this.editShipType || !this.editImoNumber) {
    alert('Please fill all fields');
    return;
  }

  const updatedShip = {
    shipName: this.editShipName,
    shipType: this.editShipType,
    imoNumber: this.editImoNumber
  };

  this.shipService.updateShip(this.editingShipId, updatedShip)
    .subscribe({
      next: () => {
  alert('Ship updated successfully!');
  window.location.reload();
},
      error: (error) => {
        console.error('Error updating ship:', error);
        alert('Unable to update ship. Check whether the IMO number is unique.');
      }
    });
}

  // Delete selected ship
  deleteShip(id: number) {

    const confirmDelete = confirm('Are you sure you want to delete this ship?');

    if (!confirmDelete) {
      return;
    }

    this.shipService.deleteShip(id).subscribe({
     next: () => {
  alert('Ship deleted successfully!');
  window.location.reload();
},
      error: (error) => {
        console.error('Error deleting ship:', error);
        alert('Unable to delete ship. It may have batteries linked to it.');
      }
    });
  }

  // Clear form fields
  clearForm() {
    this.shipName = '';
    this.shipType = '';
    this.imoNumber = '';
    this.editingShipId = null;
  }

  cancelEdit() {
  this.editingShipId = null;

  this.editShipName = '';
  this.editShipType = '';
  this.editImoNumber = '';
}

}
