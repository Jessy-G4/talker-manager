const fs = require('fs').promises;
const path = require('path');

const CAMINHO = './talker.json';

async function ReadData() {
try {
    const valor = await fs.readFile(path.resolve(__dirname, CAMINHO), 'utf-8');
    const data = await JSON.parse(valor);
    return data;
} catch (error) {
    console.log('deu ruim');
}
}

async function WriteData(novoValor) {
    try {
      const valoresAntigos = await ReadData();
      const novoValorComID = { id: valoresAntigos.length + 1, ...novoValor };
      const todosOsValores = JSON.stringify([...valoresAntigos, novoValorComID]);

      await fs.writeFile(path.resolve(__dirname, CAMINHO), todosOsValores);
      return novoValorComID;
    } catch (error) {
        console.log('deu ruim');
    }
    }

// https://stackoverflow.com/questions/70566188/node-js-crypto-randombytes-is-not-a-function
const crypto = require('crypto');

function CriarToken(param) {
    const token = crypto.randomBytes(param / 2).toString('hex');
    return token;
}

function validacao(req, res, next) {
const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' }); 

  if (!email.includes('@')) {
    return res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!password) { return res.status(400).send({ message: 'O campo "password" é obrigatório' }); }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function validando1(req, res, next) {
const { name } = req.body;    
const { authorization } = req.headers;
if (!authorization) { return res.status(401).send({ message: 'Token não encontrado' }); }
if (authorization.length < 16) { return res.status(401).send({ message: 'Token inválido' }); }
if (!name) { 
    return res.status(400).send({ message: 'O campo "name" é obrigatório' }); 
}
if (name.length < 3) {
 return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
next();
}

function validando2(req, res, next) {
const { age } = req.body;
const { watchedAt } = req.body.talk;
if (!age) { return res.status(400).send({ message: 'O campo "age" é obrigatório' }); }
if (Number(age) < 18) { 
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
if (!watchedAt) {
 return res.status(400).send({
    message: 'O campo "watchedAt" é obrigatório',
  }); 
}
next();
}

function validandoTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) { 
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' }); 
  }
 
  next();
  }
// https://pt.stackoverflow.com/questions/130541/regex-para-validar-data-yyyy-mm-dd
function validando3(req, res, next) {
const REGEX = /^\d{2}\/\d{2}\/\d{4}$/;
const { watchedAt, rate } = req.body.talk;
    if (!REGEX.test(watchedAt)) {
 return res.status(400).send({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      }); 
}
if (!rate) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
}
next();
}

function validando4(req, res, next) {
const { rate } = req.body.talk;
const condicao = !Number.isInteger(rate) || rate < 1 || rate > 5;
if (condicao) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
}

module.exports = {
    ReadData,
    WriteData,
    CriarToken,
    validacao,
    validando1,
    validando2,
    validando3,
    validando4,
    validandoTalk,
};