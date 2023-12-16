/*
6. Să se implementeze o pagină web care afișează în mod dinamic o serie de elemente de tip div colorate cu
toate valorile posibile (saturate) dintr-o paletă de culori.
*/

let div = document.body;

let r = 0, g = 0, b = 0;
let pos = 0;

div.style.margin = 0;

let style = () =>
  ` 
  background-color: rgb(${r},${g},${b});
  left: ${pos++}px;
  display: block;
  width: 1px;
  height: 100vh;
  position: absolute;
  `;

for (let i = 0; i < 256; i++) {
  r = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
for (let i = 0; i < 256; i++) {
  g = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
for (let i = 255; i >= 0; i--) {
  r = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
for (let i = 0; i < 256; i++) {
  b = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
for (let i = 255; i >= 0; i--) {
  g = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
for (let i = 0; i < 256; i++) {
  r = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
for (let i = 0; i < 256; i++) {
  g = i;
  div.innerHTML += `<span style="${style()}"></span>`;
}
