import PersonaNatural from './PersonaNatural';
import { hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fechaRegistro: Date;

  @column()
  public preferencias: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Producto, {
    foreignKey: "cliente_id"
  })
  public producto: HasMany<typeof Producto>;


  @hasOne(() => Empresa, {
    foreignKey: "cliente_id"
  })
  public empresa: HasOne<typeof Empresa>;


  @hasOne(() => PersonaNatural, {
    foreignKey: "persona_natural_id"
  })
  public personanatural: HasOne<typeof PersonaNatural>;

}
