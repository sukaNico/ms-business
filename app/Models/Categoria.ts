
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import CategoriaProducto from './CategoriaProducto';

export default class Categoria extends BaseModel {
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
    foreignKey: 'categoria_padre_id', // El campo que referencia a la categoría padre
  })
  public categoriaPadre: BelongsTo<typeof Categoria>;

  @hasOne(() => Categoria, {
    foreignKey: 'categoria_padre_id', // Asegúrate de que este sea el nombre correcto
  })
  public categoria: HasOne<typeof Categoria>;

  @hasMany(() => CategoriaProducto,{ 
    foreignKey: 'categoria_id' 
  })
  public screenings: HasMany<typeof CategoriaProducto>
}
