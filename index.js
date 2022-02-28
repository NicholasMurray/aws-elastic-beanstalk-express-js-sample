const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 8080;

let quotes;
fs.readFile('data/programming-quotes.json', 'utf8', function (err, data) {
  if (err) throw err;
  quotes = JSON.parse(data);
  console.log(quotes[Math.floor(Math.random() * quotes.length)].en);
});

const getRandomQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return randomQuote;
};

app.get('/api/random-quote', (req, res) => {
  res.send(getRandomQuote());
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
