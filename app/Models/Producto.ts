import Lote from './Lote';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente';

import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import CategoriaProducto from './CategoriaProducto';

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public cantidad: number;

  @column()
  public peso: number;

  @column()
  public lote_id: number;

  @column()
  public cliente_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => CategoriaProducto,{ 
    foreignKey: 'producto_id' 
  })
  public screenings: HasMany<typeof CategoriaProducto>

  @belongsTo(() => Cliente, {
    foreignKey: "cliente_id"
  })
  public cliente: BelongsTo<typeof Cliente>;


  @belongsTo(() => Lote, {
    foreignKey: "lote_id"
  })
  public lote: BelongsTo<typeof Lote>;

}
