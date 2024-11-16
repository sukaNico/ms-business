import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Departamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public superficie: number;

  @column()
  public poblacion: number;

  @column()
  public postalCode: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Municipio, {
    foreignKey: "departamento_id"
  })
  public municipio: HasMany<typeof Municipio>;

}
