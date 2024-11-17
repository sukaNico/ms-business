import Cliente from './Cliente';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class PersonaNatural extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nacionalidad: string;

  @column()
  public genero: string;

  @column()
  public cliente_id: number;

  @column()
  public usuario_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Empresa, {
    foreignKey: "persona_natural_id"
  })
  public empresa: HasOne<typeof Empresa>;


  @belongsTo(() => Usuario, {
    foreignKey: "usuario_id"
  })
  public usuario: BelongsTo<typeof Usuario>;


  @belongsTo(() => Cliente, {
    foreignKey: "persona_natural_id"
  })
  public cliente: BelongsTo<typeof Cliente>;

}