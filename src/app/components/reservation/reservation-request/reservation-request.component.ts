import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../models/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-reservation-request',
  templateUrl: './reservation-request.component.html'
})
export class ReservationRequestComponent implements OnInit {

  public reservation: Reservation;
  public identity: User;
  public token: string;
  public status: string = '';

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private router: Router
  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken() ?? '';
    this.reservation = new Reservation(0, this.identity?.idCliente!, 1, 0); // idAdministrador lo puedes dejar como 1 por ahora o que se asigne después
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.reservation.idDetail) {
      Swal.fire('Error', 'Debe seleccionar un viaje (detalle)', 'error');
      return;
    }
    this.reservationService.createReservation(this.token, this.reservation).subscribe({
      next: res => {
        Swal.fire('Reserva enviada', 'Tu solicitud fue enviada correctamente.', 'success');
        this.status = 'success';
        this.router.navigate(['/client-reservations']);
      },
      error: err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo enviar la reserva.', 'error');
        this.status = 'error';
      }
    });
  }

}
