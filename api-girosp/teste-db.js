import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'mysql-alenn.alwaysdata.net',
  user: 'alenn',
  password: 'girinhospzinho',
  database: 'alenn_girosp',
});

const [rows] = await conn.execute('SHOW TABLES');
console.log('Tabelas:', rows);

await conn.end();