
import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import DireccionRuta from './DireccionRuta';

export default class Anotacion extends BaseModel {
  public static table = "anotaciones"  
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fecha: DateTime;

  @column()
  public descripcion: string;

  @column()
  public direccion_ruta_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => DireccionRuta, {
    foreignKey: "direccion_ruta_id"
  })
  public direccionRuta: BelongsTo<typeof DireccionRuta>;
}
