const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  pergunta: {
    type: String,
    required: true
  },
  resposta: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);
