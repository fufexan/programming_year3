/*
2. Să se definească și să se populeze un șir de valori asociative denumit produse care face corespondența
între denumiri (o serie de chei de tip șir de caractere) și prețuri (valori numerice). Să se:
- afișeze cheile și valorile din șir prin tipărirea directă
- afișeze valorile din șir prin iterarea cheilor
- ordoneze produsele după preț și să se afișeze rezultatul
*/

let products = {
  paine: 5,
  lapte: 13,
  branza: 11,
  salam: 20,
};

// keys and values, directly
console.log(`products, directly: ${JSON.stringify(products)}`);

// keys and values, iteratively
console.log(`products, iteratively`);
for (let val in products) {
  console.log(`${val} = ${products[val]}`);
}

// sort products based on price
let products2 = [];

for (let val in products) {
  products2.push([val, products[val]]);
}

products2.sort((x, y) => x[1] - y[1]);
console.log(`sorted products:`);

for (let i of products2) {
  console.log(`${i[0]} = ${i[1]}`);
}
