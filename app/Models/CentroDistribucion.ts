import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class CentroDistribucion extends BaseModel {

  public static table = "centroDistribuciones"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public capacidad: number;

  @column()
  public telefono: number;

  @column()
  public hora_apertura: string;

  @column()
  public hora_cierre: string;

  @column()
  public direccion_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Direccion, {
    foreignKey: "direccion_id"
  })
  public direccion: BelongsTo<typeof Direccion>;

}
