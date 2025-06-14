import { Client } from './client';
export class Phones {
  constructor(
    public id: number,
    public phone: string,
    public type: string,
    public client: Client
  ) { }
}
