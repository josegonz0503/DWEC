let enlaces = document.getElementsByTagName("a");
let enlace5 = enlaces[4];

let miDiv = document.getElementById("miDiv");
let parrafos = document.getElementsByTagName("p");
let divP = document.getElementById("divP");
let creaP = document.getElementById("creaP");


let polar = divP.getElementsByTagName("p")[divP.getElementsByTagName("p").length - 1]
.getElementsByTagName("img")[0];
let miP = document.getElementById("miP");

divP.insertBefore(parrafos[2], parrafos[1]);

console.log(miP.style.color);


creaP.addEventListener('click',()=>{

    if(polar.alt){

    miP.style.color= "blue";

    let texto = document.createTextNode(polar.alt);
    let elemento = document.createElement("div");
    let miEnlace = document.createElement("a");

    elemento.appendChild(miEnlace);
    polar.parentElement.appendChild(elemento);
    polar.parentElement.replaceChild(texto, polar);

}

}

)


