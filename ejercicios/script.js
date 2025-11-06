


const nombres = ["Luke", "Obi-Wan", "Yoda", "Leia"];
const edades = [19, 57, 900, 19];


const nombreyedad = nombres+edades;

console.log(nombreyedad);


for( let i = 0; i< nombres.length; i++){

        let personaje = {
        nombre: nombres[i],
        eddad: edades[i],
        }

        console.log(personaje);

}