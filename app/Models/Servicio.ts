import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Administrador from './Administrador';
import Hotel from './Hotel';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Restaurante from './Restaurante';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Gasto from './Gasto';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Servicio extends BaseModel {

  public static table = "servicios"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public direccion: string;

  @column()
  public descripcion: string;

  @column()
  public fecha: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Gasto, {
    foreignKey: "servicio_id"
  })
  public gasto: HasMany<typeof Gasto>;


  @hasOne(() => Restaurante, {
    foreignKey: "servicio_id"
  })
  public restaurante: HasOne<typeof Restaurante>;


  @hasOne(() => Hotel, {
    foreignKey: "servicio_id"
  })
  public hotel: HasOne<typeof Hotel>;

  @belongsTo(() => Administrador, {
    foreignKey: "administrador_id"
  })
  public administrador: BelongsTo<typeof Administrador>;

}
