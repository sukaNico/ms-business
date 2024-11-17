
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DuenioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    conductor_id: schema.number()
  });

  public messages = {};
}
