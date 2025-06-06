export class User {
  constructor(
    public idUsuario: number,
    public user: string,
    public password: string,
    public email: string,
    public idAdministrador?: number,
    public idCliente?: number
  ) {}
}