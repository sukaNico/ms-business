import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Seguro extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vehiculo_id: number;

  @column()
  public tipo: string;

  @column()
  public aseguradora: string;

  @column()
  public fecha_inicio: date;

  @column()
  public fecha_fin: date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Vehiculo, {
    foreignKey: "vehiculo_id"
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;

}