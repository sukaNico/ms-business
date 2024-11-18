import Cliente from './Cliente';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import PersonaNatural from './PersonaNatural';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Empresa extends BaseModel {

  public static table = "empresas"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public nit: number;

  @column()
  public persona_natural_id: number;

  @column()
  public cliente_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => PersonaNatural, {
    foreignKey: "persona_natural_id"
  })
  public personanatural: BelongsTo<typeof PersonaNatural>;


  @belongsTo(() => Cliente, {
    foreignKey: "cliente_id"
  })
  public cliente: BelongsTo<typeof Cliente>;

}
