// começando o projeto
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// meu codigo
const { 
   ReadData,
   CriarToken, 
   validacao, 
   WriteData, 
   validando1, 
   validando2, 
   validando3,
   validando4,
   validandoTalk,
   PutData,
  } = require('./fsUtility');

app.get('/talker', async (_request, response) => {
  const valores = await ReadData();
  response.status(HTTP_OK_STATUS).send(valores);
});

app.get('/talker/:id', async (_request, response) => {
  const { id } = _request.params;
  const valores = await ReadData();
  const valorID = valores.find((get) => get.id === Number(id));
  if (!valorID) {
    const sla = { message: 'Pessoa palestrante não encontrada' };
    return response.status(404).send(sla);
  }
  return response.status(HTTP_OK_STATUS).send(valorID);
});

app.post('/login', validacao, async (req, res) => {
  const token = CriarToken(16);
  res.status(HTTP_OK_STATUS).send({ token });
});

app.post('/talker', 
validando1, 
validandoTalk,
validando2, 
validando3, 
validando4, 
async (req, res) => {
 const valor = req.body;
 const test = await WriteData(valor);
 res.status(201).send(test);
});

app.put('/talker/:id', 
validando1, 
validandoTalk,
validando2, 
validando3, 
validando4, 
async (req, res) => {
const { id } = req.params;
 const valor = req.body;
 const test = await PutData(Number(id), valor);
 res.status(200).send(test);
});
// fim do meu codigo

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
