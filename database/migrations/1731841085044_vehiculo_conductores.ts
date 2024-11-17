
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Vehiculo_conductores extends BaseSchema {
  protected tableName = 'vehiculo_conductores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      table.integer('conductor_id').unsigned().references('id').inTable('conductores')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
