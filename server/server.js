const express = require('express'),
  app = express(),
  cors = require('cors'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  db = require('./connection'),
  PORT = process.env.PORT || 9000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors());
app.use(cookieParser());

require('./routes')(app);

// catch 404
app.use((req, res, next) => {
  console.log(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  console.log(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
