import { Travel } from './../../models/travel';
import { UserService } from './../../services/user.service';
import { TravelService } from './../../services/travel.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // ✅ Sweet

@Component({
  selector: 'app-ad-viaje',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './ad-viaje.component.html',
  styleUrl: './ad-viaje.component.css',
})
export class AdViajeComponent {
  public status: number;
  public travel: any;
  public travels: any;
  private checkTravels: any;
  public token: any;
  public searchId: number;
  public showSingleTravel = false;

  constructor(
    private travelService: TravelService,
    private userService: UserService
  ) {
    this.status = -1;
    this.searchId = 0;
    this.travel = new Travel(0, '', '');
    this.loadTravels();
    this.checkTravels = setInterval(() => {
      this.loadTravels();
    }, 2500);
  }

  changeStatus(st: number) {
    this.status = st;
    let countdown = timer(4000);
    countdown.subscribe(() => {
      this.status = -1;
    });
  }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.loadTravels();
  }

  public loadTravels() {
    this.travelService.getTravels(this.token).subscribe({
      next: (response: any) => {
        this.travels = response;
      },
      error: (err: Error) => {
        console.error(err);
        this.travels = null;
      },
    });
  }

  public deleteTravelById(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el viaje permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.token = this.userService.getToken();
        this.travelService.deleteTravel(id, this.token).subscribe({
          next: () => {
            this.loadTravels();
            this.changeStatus(0);
            Swal.fire('Eliminado', 'El viaje ha sido eliminado.', 'success');
            if (this.showSingleTravel) {
              this.clearSearch();
            }
          },
          error: (err: Error) => {
            console.error(err);
            this.changeStatus(2);
            Swal.fire('Error', 'No se pudo eliminar el viaje.', 'error');
          },
        });
      }
    });
  }

  public getTravelById(id: number) {
    this.token = this.userService.getToken();
    this.travelService.getTravelById(id, this.token).subscribe({
      next: (response) => {
        this.travel = response;
        this.travels = [response];
        this.showSingleTravel = true;
        if (this.checkTravels) {
          clearInterval(this.checkTravels);
          this.checkTravels = null;
        }
      },
      error: (err: Error) => {
        console.error(err);
        this.travels = [];
        this.showSingleTravel = false;
        Swal.fire('No encontrado', 'No se encontró un viaje con ese ID.', 'info');
      },
    });
  }

  public updateTravel(id: number) {
    this.token = this.userService.getToken();
    this.travelService.updateTravel(id, this.travel, this.token).subscribe({
      next: () => {
        this.showSingleTravel = true;
        this.loadTravels();
        Swal.fire('Actualizado', 'El viaje ha sido modificado correctamente.', 'success');
        if (this.checkTravels) {
          clearInterval(this.checkTravels);
          this.checkTravels = null;
        }
      },
      error: (err: Error) => {
        console.error(err);
        this.travels = [];
        this.showSingleTravel = false;
        Swal.fire('Error', 'No se pudo modificar el viaje.', 'error');
      },
    });
  }

  public clearSearch() {
    this.loadTravels();
    this.showSingleTravel = false;
    this.searchId = 0;
  }

  onSubmit(form: any) {
    this.token = this.userService.getToken();
    this.travelService.createTravel(this.travel, this.token).subscribe({
      next: (response) => {
        form.reset();
        this.changeStatus(0);
        this.loadTravels();
        Swal.fire('Guardado', 'El viaje se guardó correctamente.', 'success');
      },
      error: (error: Error) => {
        console.error(error);
        this.changeStatus(2);
        Swal.fire('Error', 'Ocurrió un error al guardar el viaje.', 'error');
      }
    });
  }
}
