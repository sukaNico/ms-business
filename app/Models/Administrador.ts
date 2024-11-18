import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Administrador extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nivelAcceso: string;

  @column()
  public usuario_id: number;

  @column()
  public servicio_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Servicio, {
    foreignKey: "administrador_id"
  })
  public servicio: HasOne<typeof Servicio>;

}
