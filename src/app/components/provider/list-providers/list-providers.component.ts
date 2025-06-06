import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Provider } from '../../models/provider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-providers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-providers.component.html',
  styleUrl: './list-providers.component.css'
})
export class ListProvidersComponent implements OnInit{
  public status:number
  public providers: Provider[] = []
  constructor(private providerService: ProviderService){
    this.status=-1
  }

  ngOnInit(): void {
    this.GetAllProviders();
  }

  GetAllProviders(): void {
    this.providerService.GetAllProviders().subscribe({
      next: (response) => {
        console.log(response)
        this.providers = response;
      },
      error: (err:Error) => {
        console.error(err);
      }
    });
  }
}
