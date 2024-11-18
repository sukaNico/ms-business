import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Hotel extends BaseModel {

  public static table = "hoteles"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public númeroHabitacion: string;

  @column()
  public serviciosIncluidos: string;

  @column()
  public servicio_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Servicio, {
    foreignKey: "servicio_id"
  })
  public servicio: BelongsTo<typeof Servicio>;

}
