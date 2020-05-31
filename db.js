const { readFile, writeFile, openSync } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class DB {
  constructor() {
    this.DEFAULT_ITEM_CADASTRAR = 'heroes.json';
  }

  async list(id) {
    const data = await this.getDataFile();

    const filteredData = data.filter((element) =>
      id ? element.id === id : true
    );

    return filteredData;
  }

  async getDataFile() {
    const file = await readFileAsync(this.DEFAULT_ITEM_CADASTRAR, 'utf8');
    return JSON.parse(file.toString());
  }

  async writeFile(data) {
    await writeFileAsync(this.DEFAULT_ITEM_CADASTRAR, JSON.stringify(data));
    return true;
  }

  async deleteHero(id) {
    if (!id) {
      return await this.writeFile([]);
    }

    let data = await this.getDataFile();

    const index = await data.findIndex((item) => {
      console.log(id);
      console.log(item.id);
      return parseInt(item.id) == id;
    });

    if (index === -1) {
      throw Error("Heroe doesn't exists");
    }

    data.splice(index, 1);

    return await this.writeFile(data);
  }

  async updateHero(id, hero) {
    let data = await this.getDataFile();

    const index = await data.findIndex((item) => {
      return parseInt(item.id) == id;
    });

    if (index === -1) {
      throw Error("Heroe doesn't exists");
    }

    const now = data[index];

    const updateObject = {
      ...now,
      ...hero,
    };

    data.splice(index - 1, 1);

    return await this.writeFile([...data, updateObject]);
  }

  async registerHero(hero) {
    const data = await this.getDataFile();

    const id = hero.id <= 2 ? hero.id : Date.now();

    const newHero = {
      ...hero,
      id,
    };

    const finalData = [...data, newHero];

    return await this.writeFile(finalData);
  }
}

module.exports = new DB();
