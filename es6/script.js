// Desestructuración: Extracción de valores


//extaer valores de un objeto y arrays.

// // Array
// const numeros = [1,2,3];

// const [a,b,c] = numeros;

// // console.log(a,b,c);

// //objetct
// const persona = {
//     nombre: "Joan", 
//     id: 6
// };

// const {nombre, id} = persona;
// console.log(nombre, id);

// const nombre = "Joan";
// const id = 6;

// const persona = {
//     nombre, 
//     id      
// };

// console.log(persona.nombre);
// console.log(persona.id);

// const nombre = "Bob";
// const edad = 22;

// const mensaje = `Hola, mi nombre es ${nombre} y tengo ${edad} años.`;

// console.log(mensaje);


// console.log(mensaje);

//Operador Spread
//operador de propagación
//Expandir un array en múltiples elementos

// const numeros = [1,2,3];

// const masNumeros = [4, ...numeros, 4,5,6];

// console.log(masNumeros);

// Parámetros por defecto  

// $nombre = "John Doe";

// function saludar(nombre) {
//     console.log(`Hola, ${nombre}`);
// }

// saludar($nombre);

//Parámetros rest 
// Capturar un número variable de argumentos

// function sumar(...numeros){
//     let resultado = 0;

//     for(let numero of numeros){
//         resultado += numero;
//     }

//     return resultado;
// }

// console.log(sumar(2,4,6,9,3,3));



// const sumar = (...numeros) => {
//     let resultado = 0;

//     for (let numero of numeros) {
//         resultado += numero;
//     }

//     return resultado;
// };






// Arrow functions

// function sumar(a,b){
//     return a+b;
// }

// const sumar2 = (a,b) =>
//     {return a + b;

//     }

// // const sumar2 = (a,b) => a + b;


// console.log(sumar2(8,6));


 //Métodos de arrays

 //forEach()

const numeros = [1,2,3,4,5];

// numeros.forEach(
//     (numero)=>{
     
//         const dobleNumero = numero * 2;
//         console.log(dobleNumero);
//     }
//         )


// map 

// const dobleNumeros = numeros.map(
//     (numero) => {
//         return numero * 2;
//     }
// );

// console.log(dobleNumeros);


// filter()

// const numerosPares = numeros.filter(
//     (numero) => {
//         if (numero >=3 && numero < 7) 
//         return numero;
//     }
// );

// console.log(numerosPares);


//reduce()

// const suma = numeros.reduce(
//     (acumulador,numero) => {
//         return acumulador + numero;
//     }
// )

// console.log(suma);


// find()

// let numeroEcontrado = numeros.find(
//     (numero)=> {
//         return (numero % 2 === 0) && numero >2;
//     }
//     );


// console.log(numeroEcontrado);


// findIndex()

// const indiceEncontrado = numeros.findIndex(
//     (numero)=>{
//         return numero > 3;
//     }
// )

// console.log(indiceEncontrado);



// const indiceEncontrado = numeros.findLastIndex(
//     (numero) => {
//         return numero > 3;
//     }
// )

// console.log(indiceEncontrado);

// some()

// const tieneNumeroPar = numeros.some(
//     (numero)=> {
//         return numero > 3;
//     }
// );

// console.log(tieneNumeroPar);


// every()

// const todosPares = numeros.every(
//     (numero)=> {
//         return (numero % 2 ===0);
//     }
// )

// console.log(todosPares);

