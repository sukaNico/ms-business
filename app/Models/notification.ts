import Database from '@ioc:Adonis/Lucid/Database';
import axios from 'axios';

export default class Notificaciones {
  /**
   * uso await Notificacion.enviarNotificacion("departamento nuevo","nicolaslol151@gmail.com","vaya a este departamento"+ body.nombre);
   */

  static async enviarNotificacion(subject: string, recipient: string, content:string): Promise<void> {
    try {
        const response = await axios.post('http://127.0.0.1:5000/send-email', {
            subject,
            recipient,
            content
        });
    
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al enviar el correo:', error.response?.data || error.message);
      }
    
  }

  /**
   * Método estático para obtener todas las notificaciones de un usuario
   */
  static async obtenerNotificaciones(userId: number): Promise<any[]> {
    const notificaciones = await Database.from('notificaciones')
      .where('user_id', userId)
      .orderBy('created_at', 'desc');
    return notificaciones;
  }

  /**
   * Método estático para marcar una notificación como leída
   */
  static async marcarComoLeida(notificacionId: number): Promise<void> {
    await Database.from('notificaciones')
      .where('id', notificacionId)
      .update({ leida: true, updated_at: new Date() });
  }

  /**
   * Método estático para contar notificaciones no leídas de un usuario
   */
  static async contarNoLeidas(userId: number): Promise<number> {
    const count = await Database.from('notificaciones')
      .where('user_id', userId)
      .andWhere('leida', false)
      .count('* as total');
    return count[0].total;
  }
}
