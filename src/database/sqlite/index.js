const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const path = require('path');

async function sqliteConnection() {
    const database = await sqlite.open({
        /*
        nessa parte abaixo temos um jeito de ter acesso ao arquivo. 
        é uma forma de caminho para outros sistemas operacionais entendam.
        Os ".." depois de __dirname significa que saiu da pasta e logo após 
        entrou em database
        */
        filename: path.resolve(__dirname, '..', 'database.db'),
        driver: sqlite3.Database
    })

    return database;
}

module.exports = sqliteConnection;