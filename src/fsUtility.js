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
      const valoresAntigos = ReadData();
      const novoValorComID = [{ token: Date.now(), ...novoValor }];
      const todosOsValores = [...valoresAntigos, novoValorComID];

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

module.exports = {
    ReadData,
    WriteData,
    CriarToken,
    validacao,
};