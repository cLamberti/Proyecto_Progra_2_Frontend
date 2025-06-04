export class TravelDetail{
    constructor(public idDetalleViaje:number,public fecha:string,public hora:string,
        public idProveedor:number | null,public idViaje:number){}
}