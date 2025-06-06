import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TravelDetailService } from '../../services/travelDetail.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-travel-detail',
  imports: [FormsModule],
  templateUrl: './delete-travel-detail.component.html',
  styleUrl: './delete-travel-detail.component.css'
})
export class DeleteTravelDetailComponent {
  public deleteId: number = 0;
  public status: number = -1;
  public token: any;
  
  constructor(
    private travelDetailService: TravelDetailService,
    private userService: UserService
  ) {}  

  onSubmit(form: any): void {
    this.token = this.userService.getToken();
    if (!this.token) {
      console.log('Error: Token no disponible')
      this.status = 2;
      return;
    }

    this.travelDetailService.DeleteDetail(this.deleteId, this.token).subscribe({
      next: (response:any) => {
        console.log(response)
        this.status = 0;
        form.resetForm();
      },
      error: (err) => {
        if (err.status === 404) {
          console.log(err)
          this.status = 1;
        } else {
          console.log(err)
          this.status = 2;
        }
      }
    });
  }
}
