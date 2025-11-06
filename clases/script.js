
class Persona {
    
    
    // Constructor 

    constructor(nombre) {
        this.nombre = nombre;
    }


    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }

}

// const ego = new Persona("Joan");

// ego.saludar();

// Herencia - extends 

class Empleado extends Persona {
    constructor(nombre,salario){
        super(nombre);
        this.salario = salario;
    }

    trabajar() {
        console.log(`${this.nombre} está trabajando y gana ${this.salario} €`);
    }

}

const maria = new Empleado("Maria", 2000);
    

function muestraClase(){
maria.saludar();
maria.trabajar();
}
