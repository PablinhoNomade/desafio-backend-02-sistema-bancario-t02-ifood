const express = require('express')
const app = require("./rotas")

app.use(express.json());

app.listen(3000);