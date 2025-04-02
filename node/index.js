const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuração do Banco de Dados
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const connection = mysql.createConnection(config);

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
    

    // Inserir dados
    const sqlInsert = `INSERT INTO alunos(nome) VALUES ?`;
    const values = [['Salatiel'], ['Leonaldine'], ['Julio']];
    
    connection.query(sqlInsert, [values], (err) => {
        if (err) console.error('Erro ao inserir alunos:', err);
        else console.log('Alunos inseridos com sucesso!');
    });
});

// Rota principal
app.get('/', (req, res) => {
    connection.query('SELECT * FROM alunos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar alunos:', err);
            return res.status(500).send('Erro ao buscar alunos no banco de dados');
        }

        let html = '<h1>Full Cycle Rocks!</h1><br> <h2>Lista de Alunos</h2>';
        results.forEach(aluno => {
            html += `<h2>${aluno.nome}</h2>`; 
        });

        res.send(html);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
