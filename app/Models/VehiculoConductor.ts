import Conductor from './Conductor';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo';
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class VehiculoConductor extends BaseModel {
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


  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id"
  })
  public conductor: BelongsTo<typeof Conductor>;

}
