import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /usuarios — lista todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email, data_cadastro, preferencias FROM Usuario'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

// GET /usuarios/:id — busca um
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nome, email, data_cadastro, preferencias FROM Usuario WHERE id_usuario = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
});

// POST /usuarios — cria
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, preferencias } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
    }

    const [result] = await pool.execute(
      'INSERT INTO Usuario (nome, email, senha, data_cadastro, preferencias) VALUES (?, ?, ?, NOW(), ?)',
      [nome, email, senha, preferencias || null]
    );

    res.status(201).json({
      id_usuario: result.insertId,
      nome,
      email,
      preferencias,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
});

// PUT /usuarios/:id — atualiza
router.put('/:id', async (req, res) => {
  try {
    const { nome, email, senha, preferencias } = req.body;

    // monta o UPDATE dinamicamente (só atualiza o que veio)
    const campos = [];
    const valores = [];

    if (nome !== undefined) {
      campos.push('nome = ?');
      valores.push(nome);
    }
    if (email !== undefined) {
      campos.push('email = ?');
      valores.push(email);
    }
    if (senha !== undefined && senha !== '') {
      campos.push('senha = ?');
      valores.push(senha);
    }
    if (preferencias !== undefined) {
      campos.push('preferencias = ?');
      valores.push(preferencias);
    }

    if (campos.length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo para atualizar' });
    }

    valores.push(req.params.id);

    await pool.execute(
      `UPDATE Usuario SET ${campos.join(', ')} WHERE id_usuario = ?`,
      valores
    );

    res.json({ mensagem: 'Usuário atualizado' });
  } catch (err) {
    console.error('Erro no PUT /usuarios:', err);
    res.status(500).json({
      erro: 'Erro ao atualizar usuário',
      detalhe: err.message,
    });
  }
});

// DELETE /usuarios/:id — deleta
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM Usuario WHERE id_usuario = ?', [req.params.id]);
    res.json({ mensagem: 'Usuário deletado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
});

export default router;