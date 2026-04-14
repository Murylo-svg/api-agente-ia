// 1. Importações (Bibliotecas)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require('./models/Chat'); // Modelo MongoDB para salvar chats

// 2. Configurações Iniciais do Servidor
const mongoose = require('mongoose');

// MongoDB Connection - LUGAR PARA CONEXÃO COM MONGODB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agenteai')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

const app = express(); // Faltava essa linha!
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.static('public')); // Serve frontend HTML/CSS

// 3. Configuração da IA
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// 4. CRIANDO A ROTA (Endpoint) DA API
app.post('/api/chat', async (req, res) => {
    try {
        // Log para ver o que está chegando no terminal
        console.log("📦 Conteúdo recebido no corpo:", req.body);

        // Verifica se a pergunta existe
    if (!req.body || !req.body.pergunta) {
        return res.status(400).json({ 
            erro: "Corpo da requisição vazio ou sem o campo 'pergunta'." 
        });
    }

    const { pergunta } = req.body;
        console.log(`📩 Processando pergunta: "${pergunta}"`);

        // Chama o modelo da IA (Se der erro 404, mude para "gemini-pro")
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const promptFinal = `Você é um robô sarcástico. Responda a seguinte pergunta: ${pergunta}`;
        
        const result = await model.generateContent(promptFinal);
        const response = await result.response;
        const respostaDaIA = response.text();

        // Salva no MongoDB
        try {
          await new Chat({ pergunta, resposta: respostaDaIA }).save();
          console.log('💾 Chat salvo no MongoDB');
        } catch (dbErr) {
          console.error('❌ Erro salvar chat:', dbErr);
        }

        // Retorna a resposta para o cliente
        return res.status(200).json({ 
            sucesso: true,
            resposta: respostaDaIA 
        });

    } catch (erro) {
        console.error("❌ Erro detalhado no servidor:", erro.message);
        return res.status(500).json({ 
            erro: "Erro interno no servidor de IA.",
            detalhes: erro.message 
        });
    }
});

// 5. Ligar o Servidor
// Cloud ready: usa PORT da env ou 3000 local
const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando na porta ${PORTA}`);
    console.log(`📡 API: POST http://localhost:${PORTA}/api/chat`);
    console.log(`🌐 Frontend: http://localhost:${PORTA}`);
});
