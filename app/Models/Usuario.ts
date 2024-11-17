import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import PersonaNatural from './PersonaNatural';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public cedula: number;

  @column()
  public email: string;

  @column()
  public telefono: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => PersonaNatural, {
    foreignKey: "usuario_id"
  })
  public personanatural: HasOne<typeof PersonaNatural>;

}
