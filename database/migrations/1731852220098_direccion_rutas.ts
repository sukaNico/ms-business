
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Direccion_rutas extends BaseSchema {
  protected tableName = 'direccion_rutas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('direccion_id').unsigned().references('id').inTable('direcciones').onDelete('CASCADE')
      table.integer('ruta_id').unsigned().references('id').inTable('rutas').onDelete('CASCADE')
      table.integer('lote_id').unsigned().references('id').inTable('lotes')
      table.dateTime('fechaEntrega')
      table.integer('distancia')
      table.string('estado')
      table.integer('ordenDePaso')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
