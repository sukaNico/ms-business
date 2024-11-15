
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Categorias extends BaseSchema {
  protected tableName = 'categorias';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('nombre')
      table.string('descripcion')
    
      //Clave foranea 
      table.integer('categoria_padre_id').unsigned().references('categorias.id').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
