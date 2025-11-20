//comentario de una línea

/* comentario
de varias líneas */


// VARIABLES
// var, const, let 

/* let nombre = "Juan";
let numero = 3;
const PI = 3.14; 
let gano = true;  */

/* console.log(nombre,typeof(nombre));
console.log(numero,typeof(numero));
console.log(PI,typeof(PI));
console.log(gano,typeof(gano)); */

// cadenas

/* let nombre = "Joan";
let apellido = 'Melsión';
let cuento = "Cuando despertó, el dinosaurio todavía estaba allí."; 

let tabulacion = "Hola\tPepe";
console.log(tabulacion);    
let salto = "Hola\nPepe";
console.log(salto);    
let entreComillas = "Hola \"amigo\" Pepe.";
console.log(entreComillas);    
 */


// NÚMEROS

/* let edad = 44;
let precio = 99.99;
let ayudasArbitralesMadrid = Infinity;
console.log(ayudasArbitralesMadrid);
console.log(typeof(ayudasArbitralesMadrid));
let rojasParaValverde = -Infinity;
console.log(rojasParaValverde);
console.log(typeof(rojasParaValverde));
 */

// null : algo definido pero vacío o con valor nulo 
/* 
let valor = null;
console.log(valor); 
console.log(typeof(valor)); // typeof null es un bug de JS, debería devolver "null" y devuelve "object"

let prova;
console.log(typeof(prova)); // undefined
 */
// naN : not a Number
/* 
let resultado = "hola" / 3;
console.log(resultado, typeof(resultado));
 */
// BOOLEANOS
/* let messi = true;
let penaldo = false;

console.log(messi, typeof(messi));
console.log(penaldo, typeof(penaldo));
 */
// valores falsy

//null, undefined, NaN, ""

//operadores
// Aritméticos -> operaciones matemáticas
// suma: a + b
// resta: a - b
// multiplicación: a * b
// división: a / b
// módulo: a % b -> resto de la división entera


// unarios

// incremento: a++ o ++a
// decremento: a-- o --a




// Asignación

// suma y asgina: a += b;
//resta y asigna: a -= b;
// multiplicación y asigna: a *= b;
// división y asigna: a /= b;
// módulo y asigna: a %= b;

// Cambio de signo
// -: a = -b;
// +: a = +b;

/* let a = "5";
console.log(typeof(a));
// a = parseInt(a);
a = +a;
console.log(typeof(a));

let b = "4.55";
console.log(typeof(b));
// b = parseFloat(b);
b = +b;
console.log(typeof(b));

 */

// Comparación

/*

>,<,>=,<=,==,===,!=,!==

*/

// Booleannos
// AND: a && b
// OR: a || b
// NOT: !a
    
/* 
let a = 5;

let b = 10;

let esmayor = a > b;    // false
console.log(esmayor);
let esmenor = a < b;    // true
console.log(esmenor);

let esigual = a == b; // false

 */

//TRABAJANDO CON CADENAS

/* let nombre = "Joan";
let apellido = 'Melsión';

let nombreCompleto = nombre + " " + apellido;

console.log(nombreCompleto);

let inicialNombre = nombre[0];
console.log(inicialNombre);

console.log(nombre.length);

// Métodos para trabjajar con cadenas

let nombreMayusculas = nombre.toUpperCase();
console.log(nombreMayusculas);

let nombreMinusculas = nombre.toLowerCase();
console.log(nombreMinusculas);

// indexOf 


 */

/* let email = "joan@gmAil.com";

let indiceA = email.toLowerCase().indexOf("a");

console.log(indiceA);

let ultimaA = email.toLowerCase().lastIndexOf("a");

console.log(ultimaA);

// slice()

//let resultado = email.slice(0,3);

//console.log(resultado);

// substr()
// let resultado = email.substr(1,3);
// console.log(resultado);

// substring()

// resultado = email.substring(0,3);
// console.log(resultado);

// replace()

let resultado = email.replace('a','x');
console.log(resultado); */

// ARRAYS 
// Inicialización 

// let numeros = [1,2,3,4,5];
// console.log(numeros[2]);

// let nombres = ["Joan","Maria","Pere"];

// console.log(nombres[0]);

// let numeros = new Array();

// numeros[0] = 1;
// numeros[1] = 2;
// // numeros[2] = 3;
// numeros[3] = 4;
// numeros[4] = 5;

// console.log(numeros[4]);

// let nombres = new Array('Joan','Maria','Pere');

// console.log(nombres[2]);

//let numeros = new Array(5);
// numeros[0] = 8;
// numeros[4] = 100;
// numeros[10] = 99;

// console.log(numeros[10]);

// numeros = Array(5).fill(0);

// console.log(numeros[3]);

//push();

const frutas = ['manzana','banana','kiwi','naranja'];


// frutas.push('pera');
// frutas.push(6)
// console.log(frutas);    


// console.log(typeof frutas[0]);
// console.log(typeof frutas[3]);
// console.log(typeof frutas);

// // pop()

// let ultimoElemento = frutas.pop();
// console.log(frutas);

// // shift()
// let primerElemento = frutas.shift();

// //unshift()

// frutas.unshift('uva');
// console.log(frutas);

// // slice()

// const copia = frutas.slice(1,3);
// console.log(frutas);
// console.log(copia);

// //concat()

// const frutas2 = ['fresa','melocoton'];
// // const frutasCombinadas = frutas.concat(frutas2);

// const frutasCombinadas = [...frutas,...'pomelo'];
// console.log(frutasCombinadas);

// //splice()

//  console.log(frutas);

//  frutas2 = ["pomelo","kiwi"];

// frutas.splice(1,0, ...frutas2)
// console.log(frutas);    

//join()

// console.log(frutas.join('-'));

// // sort() -> unicode

// console.log(frutas);
// frutas.sort();
// console.log(frutas);

// const numeros = [10,5,8,3,1,7];
// // numeros.sort();
// // console.log(numeros);

 const ciudades = ['Zaragoza','madrid','Barcelona',"Ávila"];
// // ciudades.sort();
// // console.log(ciudades);

// // console.log(numeros.sort(function(a,b){
// //     return a-b;
// // }))

// console.log(numeros.sort((a,b) => a-b));

// ciudades.sort((a,b) => 

//     a.toLowerCase() > b.toLowerCase() ? 1 : 
//     a.toLowerCase() < b.toLowerCase() ? -1 :0


// );
// console.log(ciudades);

// ciudades.sort((a,b) => a.localeCompare(b));
// console.log(ciudades);

// Estructuras de control 

// if - else 
/* 
    let hora = 18;
   

    if (hora < 12) {
        console.log("Buenos días");
    } else if (hora < 18) {
        console.log("Buenas tardes");
    }else {
        console.log("Buenas noches");
    }



    // switch

    let nombre = "aragorn";
    let edad = -Infinity;


    switch (nombre) {
        case "gandalf":
            edad = 2019;
            break;  

        case "frodo":
            edad = 34;
            break;  
        case "aragorn":
            edad = 532;
            break;  

        case "sam":
            edad = 34;
            break;

        default:
            edad = -1;
    }   

    console.log(edad);
    console.log(nombre);

 */

    // Ternario ? : 

/*     let hora = 17;

    let mensajeBuenosDias = "Buenos días";
    let mensajeBuenasTardes = "Buenas tardes";
    let mensajeBuenasNoches = "Buenas noches";
    


        let mensaje = (hora <= 12) ? mensajeBuenosDias:
         (hora < 18) ? mensajeBuenasTardes :
          mensajeBuenasNoches;

    console.log(mensaje);

 */



    // Iteración 

    // while 

   /*  let contador = 0; 

    while ( contador < 5) {     


        console.log(contador);

        contador++;
    } */


    // do - while 


    // let contador = 10;

    // do {

    // console.log(contador);

    // contador++; 

    // } while (contador < 5);

// for 
// break continue 

    // for (let i = 0; i < 5; i++) {

    //     if(i  == 3) {
    //         console.log("Tres!");
    //         break;
    //     }

    //     console.log(i);        
    // }


    // // Funciones

    // function saludar() {
    //     console.log("Hola!");
    // }   


    // saludar();

  /*   function suma(param1, param2) {
     
        let resultado;
        resultado = param1 + param2;
        return resultado;
    }

    console.log(suma(5,8));

    function muestraCalculo() {
        console.log(suma(3,7))
    }



    muestraCalculo();

    // Objetos {} clave - valor

    let unCliente = {
        nombre: "Peter Jackson",
        "Dirección del cliente": "c/ desconocida",
        edad: 50,

        pago: {
            tipo: "Visa",
            tarjeta: "1234567890",
            "fecha de caducidad": "nunca"
        }




    }; 
    
    console.log(unCliente);

    console.log(unCliente.nombre);



    unCliente["Dirección del cliente"] = "algo";
    console.log(unCliente["Dirección del cliente"]);
    console.log(unCliente.nombre);
    console.log(unCliente.pago["fecha de caducidad"]);


    // JSON 

    // number, string, boolean, array, object, function 
*/
    //Métodos como datos 
    // let estudiante = {
    //     id: 2,
    //     nombre: "Peter",
    //     diHola: function() {
    //         return "Hola";
    //     }
    // } 


    // console.log(estudiante);
    // let saludo = estudiante.diHola();
    // console.log(saludo);

    // estudiante.edad = 22;
    // estudiante.diAdios = function() {
    //     return "Adiós";
    // }
    // console.log(estudiante);


    // this 

    // let factura = {
    //     descripcion: "factura de prueba",
    //     precio: 100.0,
    //     iva: 21.00,
    
    // total: function() {
    //         return this.precio + (this.precio * (this.iva / 100));
    //     }
    // };


    // console.log(factura);
    // console.log(factura.total());


    // CONSTRUCTORES

    function web(){ 
        this.url = "http;://localhost";
        this.nombre = "Localhost" ;
        this.MuestraInfo = function() {
            return this.url + ": " + this.nombre;
        }
    }




/*     let unaWeb = new web();
    console.log(unaWeb);
    console.log(unaWeb.url);



    let otraWeb = new Web();
    
    otraWeb.url = "http://fcbarrcelona.catt";
    otraWeb.nombre = "Més que un club";
    console.log(otraWeb);


   console.log(otraWeb.url);
    console.log(otraWeb.MuestraInfo()); */


    
    
    web.prototype.visitas = 2;

    web.saluda = function() { 
        return "Hola";
    };
    
    let unaWeb = new web("http;://localhost","Localhost");

     console.log(unaWeb.saluda());
    


    //prototype 

