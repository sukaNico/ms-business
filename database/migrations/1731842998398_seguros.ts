
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Seguros extends BaseSchema {
  protected tableName = 'seguros';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      table.string('tipo')
      table.string('aseguradora')
      table.date('fecha_inicio')
      table.date('fecha_fin')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
