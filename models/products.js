module.exports = class Product {
  constructor(name, price, description, imageUrl, tags) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.tags = tags;
  }
};
