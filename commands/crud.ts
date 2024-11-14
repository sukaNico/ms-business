import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

export default class Crud extends BaseCommand {
  public static commandName = 'crud';
  public static description = 'Crea un CRUD para la entidad especificada';

  @flags.boolean()
  declare m: boolean

  @args.string({ description: 'Nombre en singular de la entidad' })
  declare nombreEnSingular: string;

  @args.string({ description: 'Nombre en plural de la entidad' })
  declare nombreEnPlural: string;

  @args.string({ description: 'Lista de atributos en el formato nombre:tipo separados por comas' })
  declare atributos: string;

  public static settings = {
    loadApp: false,
    stayAlive: false,
  };

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private parseAttributes(): { 
    name: string; 
    type: string; 
    isForeignKey: boolean; 
    foreignTable?: string; 
    foreignColumn?: string 
  }[] {
    return this.atributos.split(',').map(param => {
      const parts = param.trim().split(':');
      const name = parts[0];
      let type = parts[1] || 'string'; // Tipo por defecto 'string'
      const isForeignKey = parts.includes('foranea');
      let foreignTable = '';
      const foreignColumn = 'id'; // Columna foránea por defecto es 'id'
  
      // Si el atributo es clave foránea, obtener la tabla foránea
      if (isForeignKey) {
        const foreignTableIndex = parts.indexOf('foranea') + 1;
        foreignTable = parts[foreignTableIndex] || '';
        if (type === 'foranea') type = 'number'; // Tipo 'integer' para claves foráneas
      }
  
      return { name, type, isForeignKey, foreignTable, foreignColumn };
    });
  }
   

  private getModelAttributes(): string {
    return this.parseAttributes()
      .map(attr => `@column()\n  public ${attr.name}: ${attr.type};`)
      .join('\n\n  ');
  }

  private getValidationRules(): string {
    return this.parseAttributes()
      .map(attr => {
        let rule;
        switch (attr.type) {
          case 'string': rule = 'schema.string({ trim: true })'; break;
          case 'number': rule = 'schema.number()'; break;
          case 'boolean': rule = 'schema.boolean()'; break;
          case 'date': rule = 'schema.date()'; break;
          default: rule = 'schema.string()';
        }
        return `${attr.name}: ${rule}`;
      })
      .join(',\n      ');
  }
  
  private getMigrationAttributes(): string {
    return this.parseAttributes()
      .map(attr => {
        let dbType;
        let migrationLine = '';
  
        // Mapeo del tipo de dato al tipo de columna de la base de datos
        switch (attr.type) {
          case 'string': dbType = 'table.string'; break;
          case 'number': dbType = 'table.integer'; break;
          case 'boolean': dbType = 'table.boolean'; break;
          case 'date': dbType = 'table.date'; break;
          default: dbType = 'table.string'; // Por defecto a string
        }
  
        // Línea para la creación de la columna
        migrationLine = `${dbType}('${attr.name}')`;
  
        // Si el atributo es una clave foránea, agregar la referencia
        if (attr.isForeignKey) {
          migrationLine += `.unsigned().references('${attr.foreignColumn}').inTable('${attr.foreignTable}')`;
        }
  
        return migrationLine;
      })
      .join('\n      '); // Unir las líneas de las columnas
  }  

  private createRoutesFile() {
    const routesPath = path.join(__dirname, '..', 'start', 'routes', `${this.nombreEnPlural}.ts`);
    
    const routeContent = `
  import Route from '@ioc:Adonis/Core/Route';
  
  Route.group(() => {
    Route.get("/${this.nombreEnPlural.toLowerCase()}", "${this.capitalize(this.nombreEnPlural)}Controller.find");
    Route.get("/${this.nombreEnPlural.toLowerCase()}/:id", "${this.capitalize(this.nombreEnPlural)}Controller.find");
    Route.post("/${this.nombreEnPlural.toLowerCase()}", "${this.capitalize(this.nombreEnPlural)}Controller.create");
    Route.put("/${this.nombreEnPlural.toLowerCase()}/:id", "${this.capitalize(this.nombreEnPlural)}Controller.update");
    Route.delete("/${this.nombreEnPlural.toLowerCase()}/:id", "${this.capitalize(this.nombreEnPlural)}Controller.delete");
  });
  `;
  
    fs.writeFileSync(routesPath, routeContent);
    this.logger.info(`Archivo de rutas creado en: ${routesPath}`);
  
    // Añadir la importación al archivo principal de rutas
    const mainRoutesPath = path.join(__dirname, '..', 'start', 'routes.ts');
    const importStatement = `import './routes/${this.nombreEnPlural}';\n`;
  
    // Leer el contenido actual del archivo de rutas
    const currentRoutesContent = fs.readFileSync(mainRoutesPath, 'utf-8');
  
    // Verificar si la importación ya existe para evitar duplicados
    if (!currentRoutesContent.includes(importStatement)) {
      // Escribir el nuevo contenido
      fs.writeFileSync(mainRoutesPath, currentRoutesContent + importStatement);
      this.logger.info(`Importación añadida al archivo de rutas principal: ${mainRoutesPath}`);
    } else {
      this.logger.info(`La importación ya existe en el archivo de rutas principal: ${mainRoutesPath}`);
    }
  }

  private generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public async run() {
    
    const modelName = this.capitalize(this.nombreEnSingular);
    const pluralEntityName = this.capitalize(this.nombreEnPlural);

    const runCommand = (command: string) => {
      return new Promise<void>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            this.logger.error(`el hp error "${command}": ${error.message + error + stdout + stderr}`);
            reject(error);
            return;
          }
          if (stderr) {
            this.logger.error(`Error en stderr: ${stderr}`);
            reject(new Error(stderr));
            return;
          }
          this.logger.info(`Resultado del comando "${command}":\n${stdout}`);
          resolve();
        });
      });
    };

    try {
      // Crear el modelo
      await runCommand(`node ace make:model ${modelName}`);
      const modelPath = path.join(__dirname, '..', 'app', 'Models', `${modelName}.ts`);
      if (fs.existsSync(modelPath)) {
        const modelContent = `
import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class ${modelName} extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  ${this.getModelAttributes()}

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
`;
        fs.writeFileSync(modelPath, modelContent);
        this.logger.info(`Modelo creado y actualizado en: ${modelPath}`);
      } else {
        this.logger.error(`No se encontró el modelo en la ruta: ${modelPath}`);
      }

      // Crear la migración
await runCommand(`node ace make:migration ${this.nombreEnPlural}`);
const migrationPath = path.join(__dirname, '..', 'database', 'migrations');

console.log(migrationPath);


// Filtrar archivos de migración que contengan el nombre de la entidad
const migrationFiles = fs.readdirSync(migrationPath).filter(file => file.includes(this.nombreEnPlural.toLowerCase()));

// Validar si se encuentra al menos un archivo
if (migrationFiles.length) {
  const migrationFilePath = path.join(migrationPath, migrationFiles[0]);
  const migrationContent = `
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ${pluralEntityName} extends BaseSchema {
  protected tableName = '${this.nombreEnPlural}';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      ${this.getMigrationAttributes()}
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
`;
  fs.writeFileSync(migrationFilePath, migrationContent);
  this.logger.info(`Migración creada y actualizada en: ${migrationFilePath}`);
  
} else {
  this.logger.error(`No se encontró la migración para ${this.nombreEnSingular}`);
}

      // Crear el controlador en plural
      await runCommand(`node ace make:controller ${pluralEntityName}`);
      const controllerPath = path.join(__dirname, '..', 'app', 'Controllers', 'Http', `${pluralEntityName}Controller.ts`);
      if (fs.existsSync(controllerPath)) {
        const controllerContent = `
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ${modelName} from 'App/Models/${modelName}';
import ${modelName}Validator from 'App/Validators/${modelName}Validator';

export default class ${pluralEntityName}Controller {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await ${modelName}.findOrFail(params.id);
    } else {
      const data = request.all();
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 20);
        return await ${modelName}.query().paginate(page, perPage);
      } else {
        return await ${modelName}.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    await request.validate(${modelName}Validator);
    const body = request.body();
    return await ${modelName}.create(body);
  }

  public async update({ params, request }: HttpContextContract) {
    const record = await ${modelName}.findOrFail(params.id);
    const body = request.body();
    
    ${this.parseAttributes()
      .map(attr => `record.${attr.name} = body.${attr.name};`)
      .join('\n    ')}

    return await record.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const record = await ${modelName}.findOrFail(params.id);
    await record.delete();
    response.status(204);
  }
}
`;
        fs.writeFileSync(controllerPath, controllerContent);
        this.logger.info(`Controlador creado y actualizado en: ${controllerPath}`);
      } else {
        this.logger.error(`No se encontró el controlador en la ruta: ${controllerPath}`);
      }
      // Crear el validator en singular
      const validatorPath = path.join(__dirname, '..', 'app', 'Validators', `${modelName}Validator.ts`);
      const validatorContent = `
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ${modelName}Validator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ${this.getValidationRules()}
  });

  public messages = {};
}
`;
      
      fs.writeFileSync(validatorPath, validatorContent);
      this.logger.info(`Validator creado y actualizado en: ${validatorPath}`);

      this.createRoutesFile();
        
      //ejecutar migraciones
      if(this.m){
        await runCommand(`node ace migration:run`);
      }
      this.logger.info('Comando CRUD ejecutado con éxito.');

    } catch (error) {
      this.logger.error(`Error al ejecutar los comandos: ${error.message}`);
    }

    //mandar las colleciones a postman
    const baseURL = 'http://127.0.0.1:3333';
        const requestFields = this.parseAttributes()
            .reduce((acc, attr) => {
                acc[attr.name] = `sample ${attr.name}`;
                return acc;
            }, {});

        const collection = {
            info: {
                _postman_id: this.generateUUID(),
                name: `${this.nombreEnSingular} CRUD`,
                schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
            },
            item: [
                {
                    name: `Crear ${this.nombreEnSingular}`,
                    request: {
                        method: 'POST',
                        header: [],
                        body: {
                            mode: 'raw',
                            raw: JSON.stringify(requestFields, null, 2),
                            options: { raw: { language: 'json' } }
                        },
                        url: `${baseURL}/${this.nombreEnPlural.toLowerCase()}`
                    },
                    response: []
                },
                {
                    name: `Actualizar ${this.nombreEnSingular}`,
                    request: {
                        method: 'PUT',
                        header: [],
                        body: {
                            mode: 'raw',
                            raw: JSON.stringify(requestFields, null, 2),
                            options: { raw: { language: 'json' } }
                        },
                        url: `${baseURL}/${this.nombreEnPlural.toLowerCase()}/1`
                    },
                    response: []
                },
                {
                    name: `Lista ${this.nombreEnPlural}`,
                    request: {
                        method: 'GET',
                        header: [],
                        url: `${baseURL}/${this.nombreEnPlural.toLowerCase()}`
                    },
                    response: []
                },
                {
                    name: `Buscar ${this.nombreEnSingular} (id)`,
                    request: {
                        method: 'GET',
                        header: [],
                        url: `${baseURL}/${this.nombreEnPlural.toLowerCase()}/1`
                    },
                    response: []
                },
                {
                    name: `Borrar ${this.nombreEnSingular}`,
                    request: {
                        method: 'DELETE',
                        header: [],
                        url: `${baseURL}/${this.nombreEnPlural.toLowerCase()}/1`
                    },
                    response: []
                }
            ]
        };

      
        

        // Realizar la solicitud POST a la API de Postman
        const response = await axios.post(
            'https://api.getpostman.com/collections?workspace='+process.env.WORKSPACE_ID,
            { collection },  // El cuerpo de la petición con la colección
            {
                headers: {
                    'X-Api-Key': process.env.POSTMAN_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(response);
        
  }
}
