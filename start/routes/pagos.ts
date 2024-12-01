

import Route from '@ioc:Adonis/Core/Route';
  
Route.group(() => {
    Route.post('/process-payment', 'PaymentController.handleProcessPayment')
    Route.post('/pago/cuota/:id_cuota', 'PaymentController.payCuota')
})//.middleware(["security"]);


