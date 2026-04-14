# API Agente AI - Deploy na Nuvem (Render)

## 🚀 Deploy Backend no Render.com (Grátis)

1. **Git Init & GitHub** (projeto não é repo ainda):
   ```
   git init
   git add .
   git commit -m "Initial commit: Agente AI ready"
   ```
   Crie repo GitHub 'api-agente-ia', então:
   ```
   git remote add origin https://github.com/SEU_USERNAME/api-agente-ia.git
   git branch -M main
   git push -u origin main
   ```

2. **Render.com**:
   - Crie conta render.com com GitHub.
   - New > Web Service > Connect GitHub repo.
   - Node runtime, Build: `npm install`, Start: `npm start`.
   - Environment Vars:
     - `GEMINI_API_KEY`: sua chave Google AI.
     - `MONGODB_URI`: MongoDB Atlas (free cluster):
       - Vá mongodb.com/cloud/atlas > Create Project/Cluster > Connect App > Driver Node > Copy URI.
       - Whitelist 0.0.0.0/0 (IP qualquer).
   - Create! Copie URL: https://api-agente-ia-xxx.onrender.com

3. **Test Backend**:
   ```
   curl -X POST https://your-app.onrender.com/api/chat \
   -H "Content-Type: application/json" \
   -d '{"pergunta":"Olá"}'
   ```

## 🌐 Frontend Cloud-Ready

Use `cloud-chat/index.html` (criado abaixo) - edite `URL_BACKEND` com sua Render URL.

Abra no browser ou hospede GitHub Pages/Vercel.

## Local Test (Mongo Atlas URI no .env)
```
npm start
open http://localhost:3000
```

**Cold Start**: Render free dorme após 15min idle - 1ª req ~30s.
