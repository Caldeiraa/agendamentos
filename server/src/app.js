const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROTAS
app.use(cors());
const routes = require('./routes');
app.use(routes);

module.exports = app;
