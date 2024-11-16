import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [rules.maxLength(50),rules.regex(/^[a-zA-Z\s]+$/) // Asegura que solo contenga letras y espacios
    ]),
    cedula: schema.string({}, [
      rules.regex(/^\d{6,10}$/), // Valida que tenga entre 6 y 10 dígitos (puede variar según tu país)
      rules.unique({ table: 'usuarios', column: 'cedula' }) // Verifica que la cédula sea única en la base de datos
    ]),
    email: schema.string({ trim: true }, [
      rules.email(), // Valida que sea un correo válido
      rules.maxLength(255), // Longitud máxima de un correo
      rules.unique({ table: 'usuarios', column: 'email' }) // Verifica que el correo sea único
    ]),
    telefono: schema.string({}, [
      rules.regex(/^\d{7,15}$/), // Valida un rango de longitud para números telefónicos
    ]),
  });

  public messages = {
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 50 caracteres',
    'nombre.regex': 'El nombre solo puede contener letras y espacios',
    'cedula.required': 'La cédula es obligatoria',
    'cedula.regex': 'La cédula debe tener entre 6 y 10 dígitos',
    'cedula.unique': 'La cédula ya está registrada',
    'email.required': 'El correo electrónico es obligatorio',
    'email.email': 'Debe proporcionar un correo válido',
    'email.unique': 'El correo ya está registrado',
    'telefono.required': 'El número de teléfono es obligatorio',
    'telefono.regex': 'El teléfono debe contener entre 7 y 15 dígitos',
    'telefono.mobile': 'El formato del teléfono móvil no es válido',
  };
}
