import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usuariosRouter from './routes/usuarios.js';
import artistasRouter from './routes/artistas.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API GiroSP rodando! 🚀' });
});

app.use('/usuarios', usuariosRouter);
app.use('/artistas', artistasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});