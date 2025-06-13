import { Phones } from './../../models/phones';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PhonesService } from '../../services/phones.service';

@Component({
  selector: 'app-client-phones',
  imports: [RouterLink, CommonModule],
  templateUrl: './client-phones.component.html',
  styleUrl: './client-phones.component.css'
})
export class ClientPhonesComponent {
  public phones: any
  public token: any
  constructor(private userService: UserService, private phonesService: PhonesService) {
  }

  searchPhonesByClient(id: number) {
    this.phonesService.getPhonesByUserID(id).subscribe({
      next: (response: any) => {
        console.log(response)
        this.phones = response
      },
      error: (err: Error) => {
        console.log(err)
        this.phones = null
      }
    })
  }
}
