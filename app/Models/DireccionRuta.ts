import { belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import Direccion from './Direccion';
import Ruta from './Ruta';

export default class DireccionRuta extends BaseModel {

  public static table = "direccion_rutas"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public direccion_id: number;

  @column()
  public ruta_id: number;

  @column()
  public lote_id: number;

  @column({columnName:"fechaEntrega" })
  public fecha_entrega: DateTime;

  @column()
  public distancia: number;

  @column()
  public estado: string;

  @column({columnName:"ordenDePaso" })
  public orden_de_paso: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Lote, {
    foreignKey: "lote_id"
  })
  public lote: BelongsTo<typeof Lote>;

  @belongsTo(() => Direccion, {
    foreignKey: "direccion_id"
  })
  public direccion: BelongsTo<typeof Direccion>;

  @belongsTo(() => Ruta, {
    foreignKey: "ruta_id"
  })
  public ruta: BelongsTo<typeof Ruta>;

}
