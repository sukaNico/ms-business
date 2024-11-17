import { belongsTo, BelongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import CentroDistribucion from './CentroDistribucion';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import DireccionRuta from './DireccionRuta';

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public barrio: string;

  @column()
  public tipoCalle: string;

  @column()
  public calle: string;

  @column()
  public numero: number;

  @column()
  public piso: string;

  @column()
  public municipio_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => CentroDistribucion, {
    foreignKey: "direccion_id"
  })
  public centrodistribucion: HasOne<typeof CentroDistribucion>;


  @belongsTo(() => Municipio, {
    foreignKey: "municipio_id"
  })
  public municipio: BelongsTo<typeof Municipio>;

  @hasMany(() => DireccionRuta,{ 
    foreignKey: 'direccion_id' // Este es el nombre de la clave foranea en la de Screening
  })
  public direccionRuta: HasMany<typeof DireccionRuta>

}
