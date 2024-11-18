import Gasto from './Gasto';
import Usuario from './Usuario';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import DuenioVehiculo from './DuenioVehiculo';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Duenio extends BaseModel {

  public static table = "duenios"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public conductor_id: number;

  @column()
  public usuario_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id"
  })
  public conductor: BelongsTo<typeof Conductor>;


  @hasMany(() => DuenioVehiculo, {
    foreignKey: "duenio_id"
  })
  public dueniovehiculo: HasMany<typeof DuenioVehiculo>;


  @belongsTo(() => Usuario, {
    foreignKey: "usuario_id"
  })
  public usuario: BelongsTo<typeof Usuario>;


  @hasMany(() => Gasto, {
    foreignKey: "duenio_id"
  })
  public gasto: HasMany<typeof Gasto>;

}
