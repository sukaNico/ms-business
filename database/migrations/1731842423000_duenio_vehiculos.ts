
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Duenio_vehiculos extends BaseSchema {
  protected tableName = 'duenio_vehiculos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      table.integer('duenio_id').unsigned().references('id').inTable('duenios')
      table.date('fecha_compra')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
