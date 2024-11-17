import Operacion from './Operacion';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public departamento_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Direccion, {
    foreignKey: "municipio_id"
  })
  public direccion: HasMany<typeof Direccion>;

  @belongsTo(() => Departamento, {
    foreignKey: "departamento_id"
  })
  public departamento: BelongsTo<typeof Departamento>;

  @hasMany(() => Operacion, {
    foreignKey: "municipio_id"
  })
  public operacion: HasMany<typeof Operacion>;

}
