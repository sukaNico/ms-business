import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota'
import Factura from 'App/Models/Factura'
import ePayco from 'epayco-sdk-node'
import Env from '@ioc:Adonis/Core/Env'
import Gasto from 'App/Models/Gasto'

// Configuración de ePayco
const apiKey = Env.get('EPAYCO_PUBLIC_KEY')
const privateKey = Env.get('EPAYCO_PRIVATE_KEY')
const language = "ES"
const test = true

const epayco = new ePayco({
  apiKey: apiKey,
  privateKey: privateKey,
  lang: language,
  test: test,
})

export default class PaymentController {
  // Función para crear el token de la tarjeta
  private async createToken(cardInfo: any) {
    try {
      const token = await epayco.token.create({
        "card[number]": cardInfo.card_number,
        "card[exp_year]": cardInfo.exp_year,
        "card[exp_month]": cardInfo.exp_month,
        "card[cvc]": cardInfo.cvc,
        "hasCvv": true,
      })
      return token
    } catch (error) {
      return { error: error.message }
    }
  }

  // Función para crear un cliente
  private async createCustomer(tokenCard: string, customerInfo: any) {
    try {
      const customer = await epayco.customers.create({
        name: customerInfo.name,
        last_name: customerInfo.last_name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        default: true,
        token_card: tokenCard,
      })
      return customer
    } catch (error) {
      return { error: error.message }
    }
  }

  // Función para procesar el pago
  private async processPayment(paymentInfo: any, customerId: string, tokenCard: string) {
    try {
      const response = await epayco.charge.create({
        token_card: tokenCard,
        customer_id: customerId,
        doc_type: "CC",           // Tipo de documento (CC = Cédula de Ciudadanía)
        doc_number: paymentInfo.doc_number,
        name: paymentInfo.name,
        last_name: paymentInfo.last_name,
        email: paymentInfo.email,
        city: paymentInfo.city,
        address: paymentInfo.address,
        phone: paymentInfo.phone,
        cell_phone: paymentInfo.cell_phone,
        bill: paymentInfo.bill,
        description: "Pago de servicios",
        value: paymentInfo.value,
        tax: "0",                 // Impuesto, si aplica
        tax_base: paymentInfo.value,
        currency: "COP",          // Moneda (COP - Peso colombiano)
      })
      return response
    } catch (error) {
      return { error: error.message }
    }
  }

  // Método principal que maneja el proceso de pago
  public async handleProcessPayment({ request, response }: HttpContextContract) {
    const data = request.only([
      'card_number',
      'exp_year',
      'exp_month',
      'cvc',
      'name',
      'last_name',
      'email',
      'phone',
      'doc_number',
      'city',
      'address',
      'cell_phone',
      'bill',
      'value',
    ])

    // Crear token
    const tokenResponse = await this.createToken(data)
    console.log("Token response:", tokenResponse)

    if ('error' in tokenResponse) {
      return response.status(500).json(tokenResponse)
    }

    const tokenCard = tokenResponse.id
    if (!tokenCard) {
      return response.status(500).json({ error: "No se pudo generar el token de la tarjeta" })
    }

    // Crear cliente
    const customerResponse = await this.createCustomer(tokenCard, data)
    console.log("Customer response:", customerResponse)

    if ('error' in customerResponse) {
      return response.status(500).json(customerResponse)
    }

    const customerId = customerResponse.data?.customerId
    if (!customerId) {
      return response.status(500).json({ error: "No se pudo crear el cliente" })
    }

    // Procesar pago
    const paymentResponse = await this.processPayment(data, customerId, tokenCard)
    console.log("Payment response:", paymentResponse)

    if ('error' in paymentResponse) {
      return response.status(500).json(paymentResponse)
    }


    return response.status(200).json(paymentResponse.data)
  }

  // Método para pagar la cuota
  public async payCuota({ params, request, response }: HttpContextContract) {
    const idCuota = params.id_cuota;
  
    // Validar que la cuota existe
    const cuota = await Cuota.find(idCuota);
    if (!cuota) {
      return response.status(404).json({ error: 'Cuota no encontrada' });
    }
  
    // Recibir datos del pago
    const paymentData = request.only([
      'card_number',
      'exp_year',
      'exp_month',
      'cvc',
      'name',
      'last_name',
      'email',
      'phone',
      'doc_number',
      'city',
      'address',
      'cell_phone',
      'bill',
      'value',
    ]);
  
    // Crear un token para la tarjeta
    const tokenResponse = await this.createToken(paymentData);
    if ('error' in tokenResponse) {
      return response.status(500).json(tokenResponse);
    }
  
    const tokenCard = tokenResponse.id;
  
    // Crear un cliente ficticio (o usar datos reales)
    const customerResponse = await this.createCustomer(tokenCard, {
      name: 'Cliente Generico',
      last_name: 'Generico',
      email: 'cliente@example.com',
      phone: '1234567890',
    });
    if ('error' in customerResponse) {
      return response.status(500).json(customerResponse);
    }
  
    const customerId = customerResponse.data?.customerId;
  
    // Procesar el pago
    const paymentResponse = await this.processPayment(paymentData, customerId, tokenCard);
    if ('error' in paymentResponse) {
      return response.status(500).json(paymentResponse);
    }
  

    console.log(paymentResponse);
    console.log(paymentResponse.data.estado);
    
    // Verificar el estado del pago
    if (paymentResponse.data.estado !== 'Aceptada') {
      return response.status(400).json({
        message: `Pago rechazado: ${paymentResponse.data.respuesta}`,
        paymentData: paymentResponse.data,
      });
    }
  
    console.log("cuota pago:", paymentResponse);
  
    // Crear una factura solo si el pago fue exitoso
    const factura = new Factura();
    factura.total = cuota.monto;
    factura.estado = "aceptado";
    factura.fecha = new Date();
    await factura.save();
  
    // Asociar la factura con la cuota
    cuota.factura_id = factura.id;
    await cuota.save();
  
    return response.status(201).json({
      message: 'Pago realizado y factura creada con éxito',
      factura,
      cuota,
    });
  }
  

  public async payGasto({ params, request, response }: HttpContextContract) {
    const idGasto = params.id_gasto;

    // Validar que el gasto existe
    const gasto = await Gasto.find(idGasto);
    if (!gasto) {
        return response.status(404).json({ error: 'Gasto no encontrado' });
    }

    console.log(request)


    // Recibir datos del pago
    const paymentData = request.only([
        'card_number',
        'exp_year',
        'exp_month',
        'cvc',
        'name',
        'last_name',
        'email',
        'phone',
        'doc_number',
        'city',
        'address',
        'cell_phone',
        'bill',
        'value',
    ]);

    // Crear un token para la tarjeta
    const tokenResponse = await this.createToken(paymentData);
    if ('error' in tokenResponse) {
        return response.status(500).json(tokenResponse);
    }

    const tokenCard = tokenResponse.id;

    // Crear un cliente ficticio (o usar datos reales)
    const customerResponse = await this.createCustomer(tokenCard, {
        name: 'Cliente Generico',
        last_name: 'Generico',
        email: 'cliente@example.com',
        phone: '1234567890',
    });
    if ('error' in customerResponse) {
        return response.status(500).json(customerResponse);
    }

    const customerId = customerResponse.data?.customerId;

    // Procesar el pago
    const paymentResponse = await this.processPayment(paymentData, customerId, tokenCard);
    if ('error' in paymentResponse) {
        return response.status(500).json(paymentResponse);
    }

    console.log(paymentResponse);
    console.log(paymentResponse.data.estado);

    // Verificar el estado del pago
    if (paymentResponse.data.estado !== 'Aceptada') {
        return response.status(400).json({
            message: `Pago rechazado: ${paymentResponse.data.respuesta}`,
            paymentData: paymentResponse.data,
        });
    }

    console.log("gasto pago:", paymentResponse);

    // Crear una factura solo si el pago fue exitoso
    const factura = new Factura();
    factura.total = gasto.costo;
    factura.estado = "aceptado";
    factura.fecha = new Date();
    await factura.save();

    // Asociar la factura con el gasto
    gasto.factura_id = factura.id;
    await gasto.save();

    return response.status(201).json({
        message: 'Pago realizado y factura creada con éxito',
        factura,
        gasto,
    });
}

}
