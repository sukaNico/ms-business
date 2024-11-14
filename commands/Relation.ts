import { BaseCommand } from '@adonisjs/core/build/standalone'
import { args } from '@adonisjs/core/build/standalone'
import { join } from 'path'
import fs from 'fs'

export default class Relation extends BaseCommand {
  public static commandName = 'relation'
  public static description = 'Crea relaciones entre dos modelos (1:n o 1:1)'

  public static settings = {
    loadApp: false,
    stayAlive: false,
  }

  @args.string({ description: 'Nombre del primer modelo (singular)', required: true })
  public model1: string

  @args.string({ description: 'Tipo de relación entre los modelos (1:n o 1:1)', required: true })
  public relationType: string

  @args.string({ description: 'Nombre del segundo modelo', required: true })
  public model2: string

  @args.string({ description: 'Llave foránea', required: true })
  public llave: string

  public async run() {
    const model1Path = join(__dirname, `../app/Models/${this.model1}.ts`)
    const model2Path = join(__dirname, `../app/Models/${this.model2}.ts`)

    let model1Content = fs.readFileSync(model1Path, 'utf-8')
    let model2Content = fs.readFileSync(model2Path, 'utf-8')

    if (this.relationType === '1:n') {
      model1Content = this.addRelation(model1Content, this.model2, 'hasMany', 'HasMany')
      model2Content = this.addRelation(model2Content, this.model1, 'belongsTo', 'BelongsTo')
    } else if (this.relationType === '1:1') {
      model1Content = this.addRelation(model1Content, this.model2, 'hasOne', 'HasOne')
      model2Content = this.addRelation(model2Content, this.model1, 'belongsTo', 'BelongsTo')
    } else {
      this.logger.error('Tipo de relación no soportado. Usa "1:n" o "1:1".')
      return
    }

    fs.writeFileSync(model1Path, model1Content)
    fs.writeFileSync(model2Path, model2Content)

    this.logger.info(`Relación ${this.relationType} entre ${this.model1} y ${this.model2} creada correctamente.`)
  }

  private addRelation(
    modelContent: string,
    relatedModel: string,
    relationType: string,
    relationImport: string
  ) {
    const formattedRelatedModel = relatedModel.charAt(0).toUpperCase() + relatedModel.slice(1)
    const relationCode = `
  @${relationType}(() => ${formattedRelatedModel}, {
    foreignKey: "${this.llave}"
  })
  public ${formattedRelatedModel.toLowerCase()}: ${relationImport}<typeof ${formattedRelatedModel}>;`

    const importStatement = `import ${formattedRelatedModel} from './${formattedRelatedModel}';`
    const relationImportStatement = `import { ${relationType}, ${relationImport} } from '@ioc:Adonis/Lucid/Orm'`

    // Agregar la importación del modelo relacionado si no existe
    if (!modelContent.includes(importStatement)) {
      modelContent = `${importStatement}\n${modelContent}`
    }

    // Agregar la importación de la relación si no existe
    if (!modelContent.includes(relationImportStatement)) {
      modelContent = `${relationImportStatement}\n${modelContent}`
    }

    // Verificar si la relación ya está definida
    if (!modelContent.includes(`@${relationType}(() => ${formattedRelatedModel}`)) {
      const closingBracketIndex = modelContent.lastIndexOf('}')
      if (closingBracketIndex !== -1) {
        modelContent =
          modelContent.substring(0, closingBracketIndex) + relationCode + '\n\n' + modelContent.substring(closingBracketIndex)
      }
    }

    return modelContent
  }
}
