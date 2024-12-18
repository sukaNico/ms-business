import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Administrador extends BaseModel {

  public static table = "administradores"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nivel_acceso: string;

  @column()
  public usuario_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Servicio, {
    foreignKey: "administrador_id"
  })
  public servicio: HasOne<typeof Servicio>;

}
