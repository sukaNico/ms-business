
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rutas extends BaseSchema {
  protected tableName = 'rutas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('contrato_id').unsigned().references('id').inTable('contratos')
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      table.string('lugar_inicio')
      table.string('lugar_fin')
      table.integer('distancia')
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
