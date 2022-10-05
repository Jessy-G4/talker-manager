// começando o projeto
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// meu codigo
const { ReadData } = require('./fsUtility');

app.get('/talker', async (_request, response) => {
  const valores = await ReadData();
  response.status(HTTP_OK_STATUS).send(valores);
});

app.get('/talker/:id', async (_request, response) => {
    const { id } = _request.params;
    const valores = await ReadData();
    const valorID = valores.find((get) => get.id === Number(id));
    console.log('aqui', id, valorID);
    if (!valorID) {
      const sla = { message: 'Pessoa palestrante não encontrada' };
    return response.status(404).send(sla);
    }
    return response.status(HTTP_OK_STATUS).send(valorID);
});

// meu codigo

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
