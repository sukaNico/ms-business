
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Gastos extends BaseSchema {
  protected tableName = 'gastos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('costo')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios')
      table.integer('conductor_id').unsigned().references('id').inTable('conductores')
      table.integer('duenios_id').unsigned().references('id').inTable('duenios')
      table.integer('factura_id').unsigned().references('id').inTable('facturas')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
