import Gasto from './Gasto';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Duenio from './Duenio';
import VehiculoConductor from './VehiculoConductor';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Turno from './Turno';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Conductor extends BaseModel {

  public static table = "conductores"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public usuario_id: number;

  @column()
  public vehiculo_id: number;

  @column()
  public licencia_conduccion: string;

  @column()
  public años_experiencia: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Usuario, {
    foreignKey: "usuario_id"
  })
  public usuario: BelongsTo<typeof Usuario>;


  @hasMany(() => Turno, {
    foreignKey: "conductor_id"
  })
  public turno: HasMany<typeof Turno>;


  @hasMany(() => VehiculoConductor, {
    foreignKey: "conductor_id"
  })
  public vehiculoconductor: HasMany<typeof VehiculoConductor>;


  @hasOne(() => Duenio, {
    foreignKey: "conductor_id"
  })
  public duenio: HasOne<typeof Duenio>;


  @hasMany(() => Gasto, {
    foreignKey: "conductor_id"
  })
  public gasto: HasMany<typeof Gasto>;

}
