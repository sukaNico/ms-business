import Factura from './Factura';
import Servicio from './Servicio';
import Duenio from './Duenio';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Gasto extends BaseModel {

  public static table = "gastos"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public costo: number;

  @column()
  public servicio_id: number;

  @column()
  public conductor_id: number;

  @column()
  public duenios_id: number;

  @column()
  public factura_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id"
  })
  public conductor: BelongsTo<typeof Conductor>;


  @belongsTo(() => Duenio, {
    foreignKey: "duenio_id"
  })
  public duenio: BelongsTo<typeof Duenio>;


  @belongsTo(() => Servicio, {
    foreignKey: "servicio_id"
  })
  public servicio: BelongsTo<typeof Servicio>;


  @belongsTo(() => Factura, {
    foreignKey: "factura_id"
  })
  public factura: BelongsTo<typeof Factura>;

}
