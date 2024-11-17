import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public conductor_id: number;

  @column()
  public hora_inico: DateTime;

  @column()
  public hora_fin: DateTime;

  @column()
  public ubicacion: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id"
  })
  public conductor: BelongsTo<typeof Conductor>;

}
