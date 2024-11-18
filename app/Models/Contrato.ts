import Ruta from './Ruta';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Contrato extends BaseModel {

  public static table = "contratos"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public cliente_id: number;

  @column()
  public valor: number;

  @column()
  public fecha_inico: Date;

  @column()
  public fecha_fin: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Cliente, {
    foreignKey: "cliente_id"
  })
  public cliente: BelongsTo<typeof Cliente>;


  @hasMany(() => Cuota, {
    foreignKey: "contrato_id"
  })
  public cuota: HasMany<typeof Cuota>;


  @hasMany(() => Ruta, {
    foreignKey: "contrato_id"
  })
  public ruta: HasMany<typeof Ruta>;

}
