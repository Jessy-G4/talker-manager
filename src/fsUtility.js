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
    console.log(token);
    return token;
}

module.exports = {
    ReadData,
    WriteData,
    CriarToken,
};