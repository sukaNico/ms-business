import Duenio from './Duenio';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo';
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DuenioVehiculo extends BaseModel {

  public static table = "duenioVehiculos"

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo, {
    foreignKey: "vehiculo_id"
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;


  @belongsTo(() => Duenio, {
    foreignKey: "duenio_id"
  })
  public duenio: BelongsTo<typeof Duenio>;

}
