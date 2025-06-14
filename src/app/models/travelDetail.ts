export class TravelDetail {
  constructor(
    public idDetalle: number,
    public fecha: string,
    public hora: string,
    public idproveedor: number | null, public id: number,
    public idViaje: number
  ) { }
}
