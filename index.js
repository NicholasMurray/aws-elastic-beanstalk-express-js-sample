const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 8080;

const FRONTEND_URI = 'http://localhost:8081';

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

app.get('/Hello', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  res.redirect(`${FRONTEND_URI}`);
});

app.listen(port);
console.log(`App running on http://localhost:${port}`);
