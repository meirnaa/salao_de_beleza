const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ifpi',
  database: 'softhair',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para salvar informações no banco de dados
app.post('/salvar-informacoes', (req, res) => {
  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const email = req.body.email;
  const senha = req.body.senha;

  const sql = 'INSERT INTO usuarios (nome, telefone, email, senha) VALUES (?, ?, ?, ?)';
  const values = [nome, telefone, email, senha];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      return res.status(500).send('Erro ao salvar informações no banco de dados.');
    }

    console.log('Informações salvas com sucesso no banco de dados.');
    res.send('Informações recebidas e salvas com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
