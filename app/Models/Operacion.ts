import Vehiculo from './Vehiculo';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Operacion extends BaseModel {

  public static table = "operaciones"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public fechaInicio: Date;

  @column()
  public fechaFinalizacion: Date;

  @column()
  public municipio_id: number;

  @column()
  public vehiculo_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Municipio, {
    foreignKey: "municipio_id"
  })
  public municipio: BelongsTo<typeof Municipio>;

  @belongsTo(() => Vehiculo, {
    foreignKey: "vehiculo_id"
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;

}
