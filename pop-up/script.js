// === REGISTRO DE USUARIOS ===
const contenidorPopup = document.querySelector('.contenidorPopup');
const btnRegistro = document.getElementById('btnRegistro');
const tancaPopup = document.querySelector('.tanca-popup');
const form = document.getElementById('form');
const nomusuari = document.getElementById('nomusuari');
const email = document.getElementById('email');
const contrasenya = document.getElementById('contrasenya');
const contrasenya2 = document.getElementById('contrasenya2');
const infoUsuario = document.getElementById('infoUsuario');

// Mostrar usuario guardado
const datosGuardados = localStorage.getItem('usuario');
if (datosGuardados) {
  const usuario = JSON.parse(datosGuardados);
  infoUsuario.innerText = `${usuario.nombre} (${usuario.email})`;
}

// Funciones de validación
function muestraError(input, mensaje) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = mensaje;
}

function muestraCorrecto(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  const small = formControl.querySelector('small');
  small.innerText = '';
}

function esEmailValido(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Evento de envío
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valido = true;

  if (nomusuari.value.trim() === '') {
    muestraError(nomusuari, 'Campo obligatorio');
    valido = false;
  } else muestraCorrecto(nomusuari);

  if (!esEmailValido(email.value)) {
    muestraError(email, 'Correo inválido');
    valido = false;
  } else muestraCorrecto(email);

  if (contrasenya.value.length < 6) {
    muestraError(contrasenya, 'Mínimo 6 caracteres');
    valido = false;
  } else muestraCorrecto(contrasenya);

  if (contrasenya.value !== contrasenya2.value) {
    muestraError(contrasenya2, 'No coinciden');
    valido = false;
  } else muestraCorrecto(contrasenya2);

  if (valido) {
    const datosUsuario = {
      nombre: nomusuari.value,
      email: email.value,
      contrasenya: contrasenya.value
    };
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    infoUsuario.innerText = `${datosUsuario.nombre} (${datosUsuario.email})`;
    contenidorPopup.style.display = 'none';
    form.reset();
  }
});

// Abrir / cerrar popup
btnRegistro.addEventListener('click', () => contenidorPopup.style.display = 'block');
tancaPopup.addEventListener('click', () => contenidorPopup.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === contenidorPopup) contenidorPopup.style.display = 'none';
});


// === LÓGICA DEL JUEGO DEL AHORCADO ===
const cuentaAtras = document.getElementById("cuentaAtras");
const tiempoTranscurrido = document.getElementById("tiempoTranscurrido");
let cuentaAtrasValor = 30;
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

// Temáticas
const peliculas = ["inception", "gladiator", "titanic", "avatar", "matrix"];
const deportes = ["futbol", "tenis", "golf", "rugby", "boxeo"];
const paises = ["españa", "mexico", "francia", "alemania", "italia"];
const animales = ["leon", "tigre", "elefante", "jirafa", "zorro"];
const ciencia = ["fisica", "quimica", "biologia", "astronomia", "geologia"];

const temas = document.querySelectorAll('.tematicas-lista li.tema');
const areaJuego = document.querySelector(".juego-area");
const letrasContenedor = document.querySelector(".letras");
const palabra = document.getElementById("palabra");
const intentos = document.getElementById("intentos");
const mensaje = document.getElementById("mensaje");
const dibujo = document.getElementById("dibujo");

temas.forEach(tema => {
  tema.addEventListener('click', () => {
    temas.forEach(t => t.classList.remove('active'));
    tema.classList.add('active');

    let palabras;
    switch (tema.id) {
      case "peliculas": palabras = peliculas; break;
      case "deportes": palabras = deportes; break;
      case "paises": palabras = paises; break;
      case "animales": palabras = animales; break;
      case "ciencia": palabras = ciencia; break;
    }
    jugar(palabras);
  });
});

function jugar(palabras) {
  const palabraRandom = palabras[Math.floor(Math.random() * palabras.length)];
  const letras = palabraRandom.split('');
  const guiones = Array(letras.length).fill('_');

  palabra.innerText = guiones.join(' ');
  mensaje.innerText = "";
  intentos.innerText = 6;
  let maxIntentos = 6;
  let adivinado = false;

  const dibujos = [
    `   -----\n  |     |\n        |\n        |\n        |\n________|`,
    `   -----\n  |     |\n  O     |\n        |\n        |\n________|`
  ];

  dibujo.innerText = dibujos[0];
  iniciarContador(finalizarJuego);

  letrasContenedor.onclick = (e) => {
    if (adivinado) return;
    if (!e.target.classList.contains("letra")) return;

    const letra = e.target.innerText.toLowerCase();

    if (letras.includes(letra)) {
      letras.forEach((l, i) => {
        if (l === letra) guiones[i] = letra;
      });
      palabra.innerText = guiones.join(' ');
      if (!guiones.includes('_')) {
        adivinado = true;
        finalizarJuego(true, "¡Ganaste!");
      }
    } else {
      maxIntentos--;
      intentos.innerText = maxIntentos;
      if (maxIntentos === 0) {
        finalizarJuego(false, `Perdiste, la palabra era: ${palabraRandom}`);
      }
    }
  };

  function finalizarJuego(ganado, texto) {
    detenerContador();
    mensaje.innerText = texto;
    mensaje.style.color = ganado ? "green" : "red";
  }
}
