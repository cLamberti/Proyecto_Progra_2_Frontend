import { TravelService } from './../../services/travel.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Travel } from '../../models/travel';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ad-viaje',
  imports: [FormsModule, RouterLink],
  templateUrl: './ad-viaje.component.html',
  styleUrl: './ad-viaje.component.css',
})
export class AdViajeComponent {
  public status: number
  public travel: Travel

  constructor(private travelService: TravelService) {
    this.status = -1
    this.travel = new Travel(0, "", "")
  }
  changeStatus(st:number) {
    this.status = st
    let countdown = timer(4000)
    countdown.subscribe(n => {
      this.status = -1
    })
  }

  onSubmit(form:any) {
    this.travelService.createTravel(this.travel).subscribe({
      next:(response) => {
        console.log(response)
        if (response.generated_id) {
          form.reset()
          this.changeStatus(0)
        } else {
          this.changeStatus(1)
        }
      },
      error:(error:Error) => {
        console.log(error)
        this.changeStatus(2)
      }
    })
  }
}
