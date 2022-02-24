import { Model } from "objection";

export class Metrics extends Model {
  static get tableName() {
    return "metrics";
  }

  readonly id!: number;
  coin!: string;
  open!: string;
  low!: string;
  high!: string;
  close!: string;
  datetime!: Date;
  periodicity!: number;
}
