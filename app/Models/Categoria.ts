
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import CategoriaProducto from './CategoriaProducto';

export default class Categoria extends BaseModel {

public static table = "categorias"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public descripcion: string;

  @column()
  public categoria_padre_id: number | null; 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Categoria, {
    foreignKey: 'categoria_padre_id',
  })
  public categoriaPadre: BelongsTo<typeof Categoria>;

  @hasOne(() => Categoria, {
    foreignKey: 'categoria_padre_id',
  })
  public categoria: HasOne<typeof Categoria>;

  @hasMany(() => CategoriaProducto,{ 
    foreignKey: 'categoria_id' 
  })
  public categoriaProductos: HasMany<typeof CategoriaProducto>
}
