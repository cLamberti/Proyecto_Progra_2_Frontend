import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';
import { Provider } from '../../../models/provider';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list-providers',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet],
  templateUrl: './list-providers.component.html',
  styleUrl: './list-providers.component.css'
})
export class ListProvidersComponent implements OnInit{
  public status:number
  public providers: Provider[] = []
  private token:any 

  constructor(
    private providerService: ProviderService,
    private userService:UserService    
  ){
    this.status=-1
  }

  ngOnInit(): void {
    this.GetAllProviders();
  }

  GetAllProviders(): void {
    this.token=this.userService.getToken()    
    this.providerService.GetAllProviders(this.token).subscribe({
      next: (response) => {
        console.log(response)
        this.providers = response;
      },
      error: (err:Error) => {
        console.error(err);
        this.status = 2;
      }
    });
  }
}
