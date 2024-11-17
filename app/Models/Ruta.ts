import Vehiculo from './Vehiculo';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public contrato_id: number;

  @column()
  public vehiculo_id: number;

  @column()
  public lugar_inicio: string;

  @column()
  public lugar_fin: string;

  @column()
  public distancia: number;

  @column()
  public fecha_inicio: date;

  @column()
  public fecha_fin: date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Contrato, {
    foreignKey: "contrato_id"
  })
  public contrato: BelongsTo<typeof Contrato>;


  @belongsTo(() => Vehiculo, {
    foreignKey: "vehiculo_id"
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;

}
