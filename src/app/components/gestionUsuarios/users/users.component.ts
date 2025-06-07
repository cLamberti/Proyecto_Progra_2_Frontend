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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  clients: Client[]=[];
  admins: Admin[] =[];
  filteredUsers: User[] = [];
  filteredClients: Client[]=[];
  filteredAdmins: Admin[]=[];
  searchTerm: string = '';

  constructor(private userService: UserService,private clientService: ClientService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
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
}
}
