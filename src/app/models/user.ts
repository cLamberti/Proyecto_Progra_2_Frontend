export class User {
  constructor(
    public idUsuario: number,
    public user: string,
    public email: string,
    public role: string,
    public password?: string,
    public telefono?: string,
    public idAdministrador?: number,
    public idCliente?: number,
    public name?: string
  ) {}
}