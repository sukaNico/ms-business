import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote';
import Vehiculo from './Vehiculo';
import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import DireccionRuta from './DireccionRuta';

export default class Ruta extends BaseModel {

  public static table = "rutas"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public contrato_id: number;

  @column()
  public vehiculo_id: number;

  @column()
  public lugar_inicio: string;

  @column()
  public lugar_fin: string;

  @column()
  public distancia: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Contrato, {
    foreignKey: "contrato_id"
  })
  public contrato: BelongsTo<typeof Contrato>;


  @belongsTo(() => Vehiculo, {
    foreignKey: "vehiculo_id"
  })
  public vehiculo: BelongsTo<typeof Vehiculo>;


  @hasMany(() => Lote, {
    foreignKey: "ruta_id"
  })
  public lote: HasMany<typeof Lote>;

  @hasMany(() => DireccionRuta,{ 
    foreignKey: 'ruta_id' 
  })
  public direccionRuta: HasMany<typeof DireccionRuta>

}
