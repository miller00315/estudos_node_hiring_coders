const { deepEqual, ok } = require('assert');
const db = require('./db');

const DEFAULT_ITEM_CADASTRAR = {
  name: 'Flash',
  power: 'speed',
  id: '1',
};

const DEFAULT_ITEM_ATUALIZAR = {
  name: 'Lanterne verde',
  power: 'Energia do anel',
  id: '2',
};

describe('Suite de manipulação de herois', () => {
  before(async () => {
    await db.registerHero(DEFAULT_ITEM_CADASTRAR);
  });

  it('Deve pesquisar herois utilizando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [res] = await db.list(expected.id); // Pega apenas a primeira posição do elemento

    deepEqual(res, expected);
  });

  it('Deve cadastrar herois utilizando arquivos', async () => {
    const res = await db.registerHero({
      name: 'Batman',
      power: 'money',
      id: '2',
    });

    deepEqual(res, true);
  });

  it('Deve deletar heroi utilizando arquivos', async () => {
    const res = await db.deleteHero(1);
    deepEqual(res, true);
  });

  it('Deve atualizar heroi utilizando arquivos', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      name: 'Vingador',
      power: 'cego com money',
    };

    await db.updateHero(DEFAULT_ITEM_ATUALIZAR.id, expected);

    const res = await db.list(DEFAULT_ITEM_ATUALIZAR.id);

    deepEqual(expected, res[0]);
  });
});
