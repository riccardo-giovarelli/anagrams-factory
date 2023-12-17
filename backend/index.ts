import pg from 'pg';
import express from 'express';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

client.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log(`App running on port 3000.`));
