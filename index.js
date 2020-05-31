const Commander = require('commander');
const db = require('./db');
const Hero = require('./hero');

async function main() {
  Commander.version('v1')
    .option('-n, --name [value], "nome do heroi"')
    .option('-p, --power [value], "poder do heroi"')
    .option('-r, --register, "Cadastrar heroi"')
    .option('-i, --id [value], "Id do heroi"')
    .option('-l, --list [value], "lista heroi"')
    .option('-d, --delete, "remove heroi"')
    .option('-u, --update [value], "atualiza heroi"')
    .parse(process.argv);

  const hero = new Hero(Commander);

  try {
    if (Commander.register) {
      const result = await db.registerHero(hero);
      if (!result) {
        console.erro('Não foi cadastrado');
      } else {
        console.log('Cadastrado');
      }

      return;
    }

    if (Commander.list) {
      const result = await db.list();

      if (!result) {
        console.erro('Não foi listado');
      } else {
        console.log(result);
      }

      return;
    }

    if (Commander.delete) {
      const result = await db.deleteHero(hero.id);

      if (!result) {
        console.error('Falha ao remover heroi');
      } else {
        console.error('Deletado');
      }
      return;
    }

    if (Commander.update) {
      const updateId = Commander.update;
      const data = JSON.stringify(hero);
      const heroUpdate = JSON.parse(data);

      const res = await db.updateHero(updateId, heroUpdate);

      if (!res) {
        console.error('Falha ao atualizar heroi');
      } else {
        console.error('Atualizado');
      }

      return;
    }
  } catch (e) {
    console.log(e);
  }
}

main();
