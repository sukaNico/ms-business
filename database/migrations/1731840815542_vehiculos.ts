
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Vehiculos extends BaseSchema {
  protected tableName = 'vehiculos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('matricula')
      table.string('modelo')
      table.string('capacidad')
      table.string('tipo_carga')
      table.float('longitud')
      table.float('latitud')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
