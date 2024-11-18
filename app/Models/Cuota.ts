import Factura from './Factura';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Cuota extends BaseModel {

  public static table = "cuotas"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public contrato_id: number;

  @column()
  public monto: number;

  @column()
  public tasa_interes: number;

  @column()
  public fecha_generacion: Date;

  @column()
  public fecha_vencimiento: Date;

  @column()
  public factura_id: number;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Contrato, {
    foreignKey: "contrato_id"
  })
  public contrato: BelongsTo<typeof Contrato>;


  @belongsTo(() => Factura, {
    foreignKey: "factura_id"
  })
  public factura: BelongsTo<typeof Factura>;

}
