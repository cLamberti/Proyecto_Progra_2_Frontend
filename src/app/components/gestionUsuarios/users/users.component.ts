import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterLink,
  ]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  clients: Client[]=[];
  admins: Admin[] =[];
  filteredUsers: User[] = [];
  filteredClients: Client[]=[];
  filteredAdmins: Admin[]=[];
  selectedUserIds: number[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  paginatedUsers: User[] = [];
  totalPages: number = 0;
  searchTerm: string = '';

  constructor(private userService: UserService,private clientService: ClientService, private adminService: AdminService,private _route: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
  }
  getNameForUser(u: any): string {
  let name = '';

  if (u.idcliente && u.idcliente.Valid) {
    const client = this.clients.find(c => c.idClient === u.idcliente.Int32);
    name = client ? client.name : 'Cliente no encontrado';
  } else if (u.idadministrador && u.idadministrador.Valid) {
    const admin = this.admins.find(a => a.idAdmin === u.idadministrador.Int32);
    name = admin ? admin.name : 'Administrador no encontrado';
  }

  return name;
}
isAllSelected(): boolean {
  return this.filteredUsers.length > 0 &&
         this.filteredUsers.every(user => this.selectedUserIds.includes(user.idUsuario));
}


  loadUsers(): void {
  this.clientService.getClient().subscribe(
    (clientsData) => {
      this.clients = clientsData.map((c: any) => ({
        idClient: c.idcliente,
        name: c.nombre
      }));

      this.adminService.getAdmin().subscribe(
        (adminsData) => {
          this.admins = adminsData.map((a: any) => ({
            idAdmin: a.idadministrador,
            name: a.nombre
          }));

          this.userService.getUsers().subscribe(
            (usersData) => {
              const mappedUsers = usersData.map((u: any) => {
                const name = this.getNameForUser(u);

                return {
                  idUsuario: u.idusuario,
                  user: u.usuario,
                  email: u.correo,
                  role: u.role,
                  idCliente: u.idcliente && u.idcliente.Valid ? u.idcliente.Int32 : null,
                  idAdministrador: u.idadministrador && u.idadministrador.Valid ? u.idadministrador.Int32 : null,
                  name: name
                };
              });

              this.users = mappedUsers;
              this.filteredUsers = mappedUsers;
              this.updatePaginatedUsers();
            },
            (error) => {
              console.error('Error al cargar usuarios', error);
            }
          );
        },
        (error) => {
          console.error('Error al cargar admins', error);
        }
      );
    },
    (error) => {
      console.error('Error al cargar clients', error);
    }
  );
}
changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }
}


toggleSelection(userId: number): void {
  const index = this.selectedUserIds.indexOf(userId);
  if (index > -1) {
    this.selectedUserIds.splice(index, 1);
  } else {
    this.selectedUserIds.push(userId);
  }
}

allSelected(): boolean {
  return this.paginatedUsers.length > 0 && this.paginatedUsers.every(user => this.selectedUserIds.includes(user.idUsuario));
}

toggleSelectAll(): void {
  if (this.isAllSelected()) {
    this.filteredUsers.forEach(user => {
      const index = this.selectedUserIds.indexOf(user.idUsuario);
      if (index > -1) {
        this.selectedUserIds.splice(index, 1);
      }
    });
  } else {
    this.filteredUsers.forEach(user => {
      if (!this.selectedUserIds.includes(user.idUsuario)) {
        this.selectedUserIds.push(user.idUsuario);
      }
    });
  }
}

  deleteSelectedUsers(): void {
  if (this.selectedUserIds.length === 0) {
    Swal.fire('Atención', 'No hay usuarios seleccionados.', 'info');
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: `Se eliminarán ${this.selectedUserIds.length} usuarios`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      const deleteRequests = this.selectedUserIds.map(id =>
        this.userService.deleteUser(id),
        this._route.navigate(['/users'])
      );

      Promise.all(deleteRequests.map(obs => obs.toPromise()))
        .then(() => {
          this.users = this.users.filter(user => !this.selectedUserIds.includes(user.idUsuario));
          this.filteredUsers = this.filteredUsers.filter(user => !this.selectedUserIds.includes(user.idUsuario));
          this.selectedUserIds = [];
          Swal.fire('Eliminados', 'Los usuarios han sido eliminados.', 'success');
          this._route.navigate(['/users']);
        })
        .catch((error) => {
          console.error('Error al eliminar usuarios', error);
          Swal.fire('Error', 'No se pudo eliminar algunos usuarios.', 'error');
        });
    }
  });
}

  deleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.users = this.users.filter(user => user.idUsuario !== id);
            this.filteredUsers = this.filteredUsers.filter(user => user.idUsuario !== id);
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar usuario', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        );
      }
    });
  }

  search(): void {
  const term = this.searchTerm.toLowerCase();
  this.filteredUsers = this.users.filter(user =>
    user.user.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.role.toLocaleLowerCase().includes(term) ||
    (user.name && user.name.toLowerCase().includes(term))
  );
  this.currentPage = 1;
  this.updatePaginatedUsers();
  }
}
