import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import DireccionRuta from './DireccionRuta';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Lote extends BaseModel {

  public static table = "lotes"

  @column({ isPrimary: true })
  public id: number;

  @column({columnName: "tipoDeCarga"})
  public tipo_de_carga: string;

  @column()
  public peso: number;

  @column()
  public ruta_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Producto, {
    foreignKey: "lote_id"
  })
  public producto: HasMany<typeof Producto>;


  @hasOne(() => DireccionRuta, {
    foreignKey: "lote_id"
  })
  public direccionruta: HasOne<typeof DireccionRuta>;


  @belongsTo(() => Ruta, {
    foreignKey: "ruta_id"
  })
  public ruta: BelongsTo<typeof Ruta>;

}
