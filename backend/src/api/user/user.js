const restful = require('node-restful');
const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Informe o nome do usuário'] },
  email: { type: String, required: [true, 'Informe o e-mail do usuário'] },
  password: { type: String, min: 6, max: 12, required: [true, 'Informe a senha do usuário'] },
});

module.exports = restful.model('User', userSchema);
