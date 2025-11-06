// === CONTADOR ===
const cuentaAtras = document.getElementById("cuentaAtras");
const tiempoTranscurrido = document.getElementById("tiempoTranscurrido");
let cuentaAtrasValor = 30; // segundos para adivinar
let tiempoTranscurridoValor = 0;
let cuentaAtrasInterval;
let tiempoTranscurridoInterval;


function iniciarContador(finalJocCallback) {
  clearInterval(cuentaAtrasInterval);
  clearInterval(tiempoTranscurridoInterval);

  cuentaAtrasValor = 30;
  tiempoTranscurridoValor = 0;

  cuentaAtras.textContent = `⏳ Tiempo restante: ${cuentaAtrasValor}s`;
  tiempoTranscurrido.textContent = `🕒 Tiempo transcurrido: ${tiempoTranscurridoValor}s`;

  cuentaAtrasInterval = setInterval(() => {
    cuentaAtrasValor--;
    cuentaAtras.textContent = `⏳ Tiempo restante: ${cuentaAtrasValor}s`;
    if (cuentaAtrasValor <= 0) {
      clearInterval(cuentaAtrasInterval);
      clearInterval(tiempoTranscurridoInterval);
      finalJocCallback(false, "¡Se acabó el tiempo!");
    }
  }, 1000);

  tiempoTranscurridoInterval = setInterval(() => {
    tiempoTranscurridoValor++;
    tiempoTranscurrido.textContent = `🕒 Tiempo transcurrido: ${tiempoTranscurridoValor}s`;
  }, 1000);
}

function detenerContador() {
  clearInterval(cuentaAtrasInterval);
  clearInterval(tiempoTranscurridoInterval);
}

// === JUEGO DEL AHORCADO ===

// Listas de palabras por temática
const peliculas = ["inception", "gladiator", "titanic", "avatar", "interstellar", "parasite", "matrix", "joker", "frozen", "coco", "dune", "oppenheimer", "barbie", "amelie", "rocky", "alien", "terminator", "avengers", "spiderman", "godzilla"];
const deportes = ["futbol", "baloncesto", "natacion", "ciclismo", "tenis", "voleibol", "atletismo", "boxeo", "rugby", "esgrima", "surf", "golf", "hockey", "patinaje", "ajedrez", "karate", "escalada", "remo", "halterofilia", "motocross"];
const paises = ["argentina", "mexico", "chile", "brasil", "peru", "canada", "españa", "francia", "italia", "alemania", "japon", "china", "india", "australia", "egipto", "sudafrica", "noruega", "suecia", "portugal", "turquia"];
const animales = ["leon", "tigre", "elefante", "jirafa", "cebra", "hipopotamo", "rinoceronte", "canguro", "panda", "koala", "lobo", "zorro", "oso", "camaleon", "pingüino", "delfin", "tiburon", "ballena", "aguila", "serpiente"];
const ciencia = ["quimica", "fisica", "biologia", "astronomia", "geologia", "genetica", "anatomia", "ecologia", "botanica", "zoologia", "neurociencia", "microbiologia", "termologia", "optica", "mecanica", "electricidad", "magnetismo", "matematica", "cosmologia", "paleontologia"];

const arrays = [peliculas, deportes, paises, animales, ciencia];
const aleatorio = arrays[Math.floor(Math.random() * arrays.length)];

const temas = document.querySelectorAll('.tematicas-lista li.tema');
const areaJuego = document.querySelector(".juego-area");
const letrasContenedor = document.querySelector(".letras");
const palabra = document.getElementById("palabra");
const intentos = document.getElementById("intentos");
const mensaje = document.getElementById("mensaje");
const dibujo = document.getElementById("dibujo");


// Iniciar con teclado inactivo
areaJuego.classList.add("juego-inactivo");

// Fondo aleatorio
const colores = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
  '#E0BBE4', '#957DAD', '#D5AAFF', '#A0CED9', '#B5EAD7',
  '#C7CEEA', '#F3B0C3', '#F6E2B3', '#B3F3EC', '#B3D1F3',
  '#F3C1B3', '#D1F3B3', '#F3B3E6', '#B3F3F3', '#E3F3B3'
];
document.body.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

let palabras = [];

temas.forEach(tema => {
  tema.addEventListener('click', () => {
    temas.forEach(t => t.classList.remove('active'));
    tema.classList.add('active');

    const temaSeleccionado = tema.getAttribute('id');
    switch (temaSeleccionado) {
      case "peliculas": palabras = peliculas; break;
      case "deportes": palabras = deportes; break;
      case "paises": palabras = paises; break;
      case "animales": palabras = animales; break;
      case "ciencia": palabras = ciencia; break;
      case "aleatorio": palabras = aleatorio; break;
      default: palabras = ["rojo", "verde"];
    }

    areaJuego.classList.remove('juego-inactivo');
    document.getElementsByTagName("nav")[0].classList.add("tematicas-inactivas");

    jugar(palabras);
  });
});

function jugar(palabras) {
  const palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
  const letras = palabraRandom.split('');
  const guiones = Array(letras.length).fill('_');

  palabra.innerText = guiones.join(' ');
  mensaje.innerText = "";
  mensaje.classList.remove("ganado", "perdido");

  letrasContenedor.classList.remove('teclado-inactivo');
  [...letrasContenedor.children].forEach(boton => {
    boton.disabled = false;
    boton.classList.remove("correcta", "usada");
  });

  let falladas = [];
  let adivinado = false;
  let maxIntentos = 6;
  intentos.innerText = maxIntentos;

  const dibujos = [
    `   -----\n  |     |\n        |\n        |\n        |\n________|`,
    `   -----\n  |     |\n  O     |\n        |\n        |\n________|`,
    `   -----\n  |     |\n  O     |\n /      |\n        |\n________|`,
    `   -----\n  |     |\n  O     |\n / \\    |\n        |\n________|`,
    `   -----\n  |     |\n  O     |\n /|\\    |\n        |\n________|`,
    `   -----\n  |     |\n  O     |\n /|\\    |\n /      |\n________|`,
    `   -----\n  |     |\n  O     |\n /|\\    |\n / \\    |\n________|`
  ];

  dibujo.innerText = dibujos[0];

  // Iniciar el contador al comenzar la partida
  iniciarContador(finalizarJuego);

  letrasContenedor.onclick = function (e) {
    if (adivinado) return;
    if (!e.target.classList.contains("letra") || e.target.disabled) return;

    const letra = e.target.innerText.toLowerCase();
    e.target.disabled = true;

    if (letras.includes(letra)) {
      e.target.classList.add("correcta");
      letras.forEach((l, i) => {
        if (l === letra) guiones[i] = letra;
      });

      palabra.innerText = guiones.join(' ');

      if (!guiones.includes('_')) {
        adivinado = true;
        finalizarJuego(true, "¡Felicidades! Has acertado la palabra.");
      }
    } else {
      e.target.classList.add("usada");
      falladas.push(letra);
      maxIntentos--;
      intentos.innerText = maxIntentos;
      dibujo.innerText = dibujos[6 - maxIntentos];

      if (maxIntentos === 0) {
        adivinado = true;
        finalizarJuego(false, `¡Lo siento! La palabra era: ${palabraRandom}`);
      }
    }
  };

  function finalizarJuego(ganado, texto) {
    detenerContador();
    mensaje.innerText = texto;
    mensaje.classList.add(ganado ? "ganado" : "perdido");
    letrasContenedor.classList.add('teclado-inactivo');
    [...letrasContenedor.children].forEach(boton => boton.disabled = true);
  }
}

// script formulario inicio de sesion --------------------------------------------------------------------------------------------------------

// Capturar elementos del formulario
const form = document.getElementById('form');
const nomusuari = document.getElementById('nomusuari');
const email = document.getElementById('email');
const contrasenya = document.getElementById('contrasenya');
const contrasenya2 = document.getElementById('contrasenya2');

// Funciones para mostrar errores y correctos
function muestraError(input, mensaje) {
  const formControl = input.parentElement;
  formControl.classList.remove('correcte');
  formControl.classList.add('error');
  const label = formControl.querySelector('label');
  const small = formControl.querySelector('small');
  small.innerText = `${label.innerText}: ${mensaje}`;
}

function muestraCorrecto(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('correcte'); // 🔹 usa "correcte"
  const small = formControl.querySelector('small');
  small.innerText = '';
}


// Validar email con expresión regular
function esEmailValido(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
        muestraCorrecto(input);
        return true;
    } else {
        muestraError(input, 'no es válido');
        return false;
    }
}

// Función para comprobar campos obligatorios
function esObligatorio(inputArr) {
    let valido = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            muestraError(input, 'es obligatorio');
            valido = false;
        } else {
            muestraCorrecto(input);
        }
    });
    return valido;
}

// ✅ Nueva función para comprobar la longitud de varios elementos
function compruebaLongitud(inputsArr) {
    let todoCorrecto = true;

    inputsArr.forEach(({ input, min, max }) => {
        if (input.value.length < min) {
            muestraError(input, `debe tener al menos ${min} caracteres`);
            todoCorrecto = false;
        } else if (input.value.length > max) {
            muestraError(input, `debe tener menos de ${max} caracteres`);
            todoCorrecto = false;
        } else {
            muestraCorrecto(input);
        }
    });

    return todoCorrecto;
}

// Función para comprobar que las contraseñas coinciden
function compruebaContrasenas(input1, input2) {
    if (input1.value !== input2.value) {
        muestraError(input2, 'no coincide');
        return false;
    } else {
        muestraCorrecto(input2);
        return true;
    }
}

// Evento del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Comprobar campos obligatorios
    const obligatorioOK = esObligatorio([nomusuari, email, contrasenya, contrasenya2]);

    // Si los campos obligatorios están completos, validar el resto
    if (obligatorioOK) {
        const emailOK = esEmailValido(email);

        const longitudesOK = compruebaLongitud([
            { input: nomusuari, min: 3, max: 15 },
            { input: contrasenya, min: 6, max: 25 }
        ]);
        const contrasenasCoinciden = compruebaContrasenas(contrasenya, contrasenya2);

        if (emailOK && longitudesOK && contrasenasCoinciden) {
            console.log(' ¡Formulario válido!');
        } else {
            console.log('⚠️ Hay errores en el formulario.');
        }
    }
});
