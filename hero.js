class Hero {
  constructor({ name, power, id = Date.now() }) {
    this.name = name;
    this.power = power;
    this.id = id;
  }
}

module.exports = Hero;
