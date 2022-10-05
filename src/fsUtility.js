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
      const todosOsValores = [...valoresAntigos, novoValor];

      await fs.writeFile(path.resolve(__dirname, CAMINHO), todosOsValores);
    } catch (error) {
        console.log('deu ruim');
    }
    }

module.exports = {
    ReadData,
    WriteData,
};