import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /artistas — lista todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id_artista, genero, contato, biografia FROM Artista'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar artistas' });
  }
});

// GET /artistas/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id_artista, genero, contato, biografia FROM Artista WHERE id_artista = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ erro: 'Artista não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar artista' });
  }
});

// POST /artistas
router.post('/', async (req, res) => {
  try {
    const { genero, contato, biografia } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO Artista (genero, contato, biografia) VALUES (?, ?, ?)',
      [genero, contato, biografia]
    );
    res.status(201).json({ id_artista: result.insertId, genero, contato, biografia });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar artista' });
  }
});

// PUT /artistas/:id
router.put('/:id', async (req, res) => {
  try {
    const { genero, contato, biografia } = req.body;
    await pool.execute(
      'UPDATE Artista SET genero = ?, contato = ?, biografia = ? WHERE id_artista = ?',
      [genero, contato, biografia, req.params.id]
    );
    res.json({ mensagem: 'Artista atualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar artista' });
  }
});

// DELETE /artistas/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM Artista WHERE id_artista = ?', [req.params.id]);
    res.json({ mensagem: 'Artista deletado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar artista' });
  }
});

export default router;