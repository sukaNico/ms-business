
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Categoria from './Categoria';
import Producto from './Producto';

export default class CategoriaProducto extends BaseModel {

  public static table = "categoriaProductos"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public categoria_id: number;

  @column()
  public producto_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Categoria,{ 
    foreignKey: 'categoria_id' 
  })
  public categoria : BelongsTo<typeof Categoria>

  @belongsTo(() => Producto,{ 
    foreignKey: 'producto_id'
  })
  public producto : BelongsTo<typeof Producto>
}
