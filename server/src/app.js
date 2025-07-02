const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROTAS
const routes = require('./src/app/routes');
app.use(routes);

module.exports = app;
