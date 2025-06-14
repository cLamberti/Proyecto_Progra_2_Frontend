import { TravelDetail } from "./travelDetail";

export class Reservation {
  constructor(
    public idreservas: number,
    public idCliente: number,
    public idAdministrador: number,
    public idDetail: TravelDetail
  ) {}
}
