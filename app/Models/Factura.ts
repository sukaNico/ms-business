import Gasto from './Gasto';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Factura extends BaseModel {

  public static table = "facturas"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public fecha: Date;

  @column()
  public total: number;

  @column()
  public estado: string;

  @column()
  public cuota_id: number;

  @column()
  public gasto_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Cuota, {
    foreignKey: "factura_id"
  })
  public cuota: HasOne<typeof Cuota>;


  @hasOne(() => Gasto, {
    foreignKey: "factura_id"
  })
  public gasto: HasOne<typeof Gasto>;

}
