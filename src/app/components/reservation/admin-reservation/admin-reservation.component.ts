import { Component, OnInit } from '@angular/core';
import { Reservation } from './../../../models/reservation';
import { UserService } from './../../../services/user.service';
import { ReservationService } from './../../../services/reservation.service';
import { TravelDetailService } from './../../../services/travelDetail.service';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reservation',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-reservation.component.html',
  styleUrl: './admin-reservation.component.css'
})
export class AdminReservationComponent implements OnInit{
  public status: number
  public reservation: any
  public reservations: any
  public travelDetails: any[] = []
  public users: any[] = []
  private checkReservations: any
  public token: any
  public searchId: number
  public showSingleTravel = false

  constructor(
    private reservationService: ReservationService, 
    private travelDetailService: TravelDetailService,
    private userService: UserService
  ) {
    this.status = -1
    this.searchId = 0
    this.reservation = new Reservation(0, 0, 0, "")
    this.loadReservations()
    this.checkReservations = setInterval(() => {
      this.loadReservations()
    }, 2500)
  }
  changeStatus(st: number) {
    this.status = st
    let countdown = timer(4000)
    countdown.subscribe(n => {
      this.status = -1
    })
  }

  ngOnInit(): void {
    this.token = this.userService.getToken()
    this.loadReservations()

    if (this.token) {
      this.travelDetailService.getAllDetails(this.token).subscribe({
        next: (response:any) => {
          console.log(response)
          this.travelDetails = response;
        },
        error: (err:Error) => {
          console.error(err);
        }
      });

      this.userService.getUsers().subscribe({
        next: (response:any) => {
          console.log(response)
          this.users = response;
        },
        error: (err:Error) => {
          console.error(err);
        }
      });
    }    
  }

  public loadReservations() {
    this.token = this.userService.getToken()
    this.reservationService.getReservations(this.token).subscribe({
      next: (response: any) => {
        console.log(response)
        this.reservations = response
      },
      error: (err: Error) => {
        console.log(err)
        this.reservations = null
      }
    })
  }

  public deleteReservationById(id: number) {
    this.token = this.userService.getToken()
    this.reservationService.deleteReservation(id, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.reservation = response
        this.loadReservations()
        this.changeStatus(0)
        if (this.showSingleTravel) {
          this.clearSearch()
        }
      },
      error: (err: Error) => {
        console.log(err)
        this.changeStatus(2)
        this.reservation = null
      }
    })
  }


  public getReservationById(id: number) {
    this.token = this.userService.getToken()
    this.reservationService.getReservationsById(id, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.reservation = response
        this.reservations = [response]
        this.showSingleTravel = true
        if (this.checkReservations) {
          clearInterval(this.checkReservations)
          this.checkReservations = null
        }
      },
      error: (err: Error) => {
        console.log(err)
        this.reservations = []
        this.showSingleTravel = false
      }
    })
  }

  public updateReservation(id:number) {
    this.token = this.userService.getToken()
    this.reservationService.updateReservation(id, this.reservation, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.reservation = response
        this.showSingleTravel = true
        if (this.checkReservations) {
          clearInterval(this.checkReservations)
          this.checkReservations = null
        }
      },
      error: (err:Error) => {
        console.log(err)
        this.reservations = []
        this.showSingleTravel = false
      }
    })
  }

  public clearSearch() {
    this.loadReservations()
    this.showSingleTravel = false
    this.searchId = 0
  }

  onSubmit(form: any) {
    this.token = this.userService.getToken()
    const data: Reservation = {
      idreservas: 0,
      idDetail: this.reservation.detailID,
      idUsuario: this.reservation.usuarioID,
      estado: this.reservation.estado
    };   
    this.reservationService.createReservation(data, this.token).subscribe({
      next: (response: any) => {
        console.log(response)
        console.log(JSON.stringify(this.reservation))
        if (response.generated_id) {
          form.reset()
          this.changeStatus(0)
          this.loadReservations()
        } else {
          this.changeStatus(1)
        }
      },
      error: (error: Error) => {
        console.log(error)
        this.reservation = null
        this.changeStatus(2)
      }
    })
  }  

  trackById(index: number, item: any): number {
  return item.idUsuario;
}  

}
