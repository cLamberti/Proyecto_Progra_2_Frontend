import { Travel } from './../../models/travel';
import { UserService } from './../../services/user.service';
import { TravelService } from './../../services/travel.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-viaje',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './ad-viaje.component.html',
  styleUrl: './ad-viaje.component.css',
})
export class AdViajeComponent {
  public status: number
  public travel: any
  public travels: any
  private checkTravels: any
  public token: any
  public searchId: number
  public showSingleTravel = false

  constructor(private travelService: TravelService, private userService: UserService) {
    this.status = -1
    this.searchId = 0
    this.travel = new Travel(0, "", "")
    this.loadTravels()
    this.checkTravels = setInterval(() => {
      this.loadTravels()
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
    this.loadTravels()
  }

  public loadTravels() {
    this.travelService.getTravels(this.token).subscribe({
      next: (response: any) => {
        console.log(response)
        this.travels = response
      },
      error: (err: Error) => {
        console.log(err)
        this.travels = null
      }
    })
  }

  public deleteTravelById(id: number) {
    this.token = this.userService.getToken()
    this.travelService.deleteTravel(id, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.loadTravels()
        this.changeStatus(0)
        if (this.showSingleTravel) {
          this.clearSearch()
        }
      },
      error: (err: Error) => {
        console.log(err)
        this.changeStatus(2)
      }
    })
  }


  public getTravelById(id: number) {
    this.token = this.userService.getToken()
    this.travelService.getTravelById(id, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.travel = response
        this.travels = [response]
        this.showSingleTravel = true
        if (this.checkTravels) {
          clearInterval(this.checkTravels)
          this.checkTravels = null
        }
      },
      error: (err: Error) => {
        console.log(err)
        this.travels = []
        this.showSingleTravel = false
      }
    })
  }

  public updateTravel(id:number) {
    this.token = this.userService.getToken()
    this.travelService.updateTravel(id, this.travel, this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.showSingleTravel = true
        if (this.checkTravels) {
          clearInterval(this.checkTravels)
          this.checkTravels = null
        }
      },
      error: (err:Error) => {
        console.log(err)
        this.travels = []
        this.showSingleTravel = false
      }
    })
  }

  public clearSearch() {
    this.loadTravels()
    this.showSingleTravel = false
    this.searchId = 0
  }

  onSubmit(form: any) {
    this.token = this.userService.getToken()
    this.travelService.createTravel(this.travel, this.token).subscribe({
      next: (response) => {
        console.log(response)
        if (response.generated_id) {
          form.reset()
          this.changeStatus(0)
          this.loadTravels()
        } else {
          this.changeStatus(1)
        }
      },
      error: (error: Error) => {
        console.log(error)
        this.changeStatus(2)
      }
    })
  }
}
