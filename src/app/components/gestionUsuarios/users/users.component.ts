import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...users];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      }
    });
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.user.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term)
    );
  }

  deleteUser(userId: number, userName: string): void {
    Swal.fire({
      title: `¿Eliminar usuario?`,
      text: `Estás a punto de eliminar a ${userName}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.loadUsers();
            Swal.fire(
              'Eliminado!',
              `El usuario ${userName} ha sido eliminado.`,
              'success'
            );
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        });
      }
    });
  }
}