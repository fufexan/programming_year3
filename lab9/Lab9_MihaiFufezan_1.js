/*
1. Să se definească și să se populeze un șir de valori numerice. Să se efectueze:
- ordonarea crescătoare și descrescătoare a valorilor din șir
- eliminarea din șir a valorilor pare
- introducerea în șir a elementelor unui alt șir predefini
*/

let array = [6, 1, 3, 7, 16, 86, 23];
let predefined = [5, 11, 13, 17, 19];
console.log(`array:\n${array}`);

array = array.sort((x, y) => x - y); // ascendent sorting
console.log(`ascendent sorting:\n${array}`);

array = array.sort((x, y) => y - x); // ascendent sorting
console.log(`descendent sorting:\n${array}`);

array = array.filter((e) => e % 2);
console.log(`removal of even values:\n${array}`);

array = array.concat(array, predefined);
console.log(`adding values from another array:\n${array}`);
