
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public servicio_id: number;

  @column()
  public conductor_id: number;

  @column()
  public monto: number;

  @column()
  public descripcion: string;

  @column()
  public estado: string;

  @column()
  public dueño_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
