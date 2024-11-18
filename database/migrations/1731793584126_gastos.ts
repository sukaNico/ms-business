
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Gastos extends BaseSchema {
  protected tableName = 'gastos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('costo')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE')
      table.integer('conductor_id').unsigned().references('id').inTable('conductores').onDelete('CASCADE')
      table.integer('duenios_id').unsigned().references('id').inTable('duenios').onDelete('CASCADE')
      table.integer('factura_id').unsigned().references('id').inTable('facturas').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
