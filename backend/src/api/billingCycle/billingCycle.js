const restful = require('node-restful');
const mongoose = restful.mongoose;

const creditSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Informe o nome do crédito'] },
  value: {
    type: Number,
    min: [0, 'Valor do crédito deve ser maior que zero!'],
    required: [true, 'Informe o valor do crédito'],
  },
});

const debtSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Informe o nome do débito'] },
  value: {
    type: Number,
    min: [0, 'Valor do débito deve ser maior que zero!'],
    required: [true, 'Informe o valor do débito'],
  },
  status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] },
});

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Informe o nome do ciclo de pagamento'] },
  month: {
    type: Number,
    min: [1, 'MÊS deve ser maior que zero!'],
    max: [12, 'MÊS deve ser menor ou igual a 12!'],
    required: [true, 'Informe o mês do ciclo de pagamento'],
  },
  year: {
    type: Number,
    min: [1970, 'Ano deve ser maior ou igual a 1970!'],
    max: [2100, 'Ano deve ser menor ou igual a 2100!'],
    required: [true, 'Informe o ano do ciclo de pagamento'],
  },
  credits: [creditSchema],
  debts: [debtSchema],
});

module.exports = restful.model('BillingCycle', billingCycleSchema);
