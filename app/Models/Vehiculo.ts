import Operacion from './Operacion';
import Ruta from './Ruta';
import Seguro from './Seguro';
import DuenioVehiculo from './DuenioVehiculo';
import { hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import VehiculoConductor from './VehiculoConductor';

import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Vehiculo extends BaseModel {

  public static table = "vehiculos"

  @column({ isPrimary: true })
  public id: number;

  @column()
  public matricula: string;

  @column()
  public modelo: string;

  @column()
  public capacidad: number;

  @column()
  public tipo_carga: string;

  @column()
  public longitud: number;

  @column()
  public latitud: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => VehiculoConductor, {
    foreignKey: "vehiculo_id"
  })
  public vehiculoconductor: HasMany<typeof VehiculoConductor>;


  @hasMany(() => DuenioVehiculo, {
    foreignKey: "vehiculo_id"
  })
  public dueniovehiculo: HasMany<typeof DuenioVehiculo>;


  @hasMany(() => Seguro, {
    foreignKey: "vehiculo_id"
  })
  public seguro: HasMany<typeof Seguro>;


  @hasMany(() => Ruta, {
    foreignKey: "vehiculo_id"
  })
  public ruta: HasMany<typeof Ruta>;


  @hasMany(() => Operacion, {
    foreignKey: "vehiculo_id"
  })
  public operacion: HasMany<typeof Operacion>;

}
