
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Operaciones extends BaseSchema {
  protected tableName = 'operaciones';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('fechaInicio')
      table.string('fechaFinalizacion')
      table.integer('municipio_id').unsigned().references('id').inTable('municipios')
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
