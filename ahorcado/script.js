/* ============================== REGISTRO / SESIÓN ============================== */

const popupRegistro = document.getElementById("popupRegistro");
const popupLogout = document.getElementById("popupLogout");
const tematicasLista = document.querySelector(".tematicas-lista");
const contenedor = document.getElementsByClassName("contenedor")[0];
const estadoJSON = document.getElementById("estadoJSON");

if (!localStorage.getItem("usuarioAhorcado")) {
  popupRegistro.style.display = "flex";
  tematicasLista.style.pointerEvents = "none";
  tematicasLista.style.opacity = "0.4";
} else {
  contenedor.style.display = "none";
}

/* ============================== CONTADOR ============================== */

const cuentaAtras = document.getElementById("cuentaAtras");
const tiempoTranscurrido = document.getElementById("tiempoTranscurrido");

let cuentaAtrasValor = 30;
let tiempoTranscurridoValor = 0;
let cuentaAtrasInterval = null;
let tiempoTranscurridoInterval = null;

function iniciarContador() {
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
      detenerContador();
      if (typeof tiempoAgotadoCallback === "function") {
        tiempoAgotadoCallback();
      }
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

/* ============================== JSON + FALLBACK ============================== */

const fallbackCategorias = {
  peliculas: ["inception","gladiator","titanic","avatar","interstellar","matrix"],
  deportes: ["futbol","tenis","rugby","golf","natacion"],
  paises: ["mexico","chile","brasil","canada","españa"],
  animales: ["leon","tigre","elefante","jirafa","panda"],
  ciencia: ["fisica","quimica","biologia","optica","genetica"]
};

let categoriasMap = {};
let palabrasJSON = [];
let jsonCargadoCorrectamente = false;

fetch("json/palabras.json")
  .then(r => r.json())
  .then(data => {
    palabrasJSON = data.palabras;

    categoriasMap = data.palabras.reduce((acc, item) => {
      if (!acc[item.categoria]) acc[item.categoria] = [];
      acc[item.categoria].push(item.palabra.toLowerCase());
      return acc;
    }, {});

    jsonCargadoCorrectamente = true;
    estadoJSON.textContent = "JSON cargado correctamente";
    estadoJSON.className = "estado-json json-ok";
  })
  .catch(err => {
    categoriasMap = fallbackCategorias;
    jsonCargadoCorrectamente = false;
    estadoJSON.textContent = "Usando fallback (JSON no disponible)";
    estadoJSON.className = "estado-json json-fallback";
  });

function dataPalabrasFiltradas(categoria, dificultad) {
  return palabrasJSON
    .filter(p => p.categoria === categoria && p.dificultad === dificultad)
    .map(p => p.palabra.toLowerCase());
}

/* ============================== JUEGO ============================== */

const areaJuego = document.querySelector(".juego-area");
const letrasContenedor = document.querySelector(".letras");
const palabra = document.getElementById("palabra");
const intentos = document.getElementById("intentos");
const mensaje = document.getElementById("mensaje");
const dibujo = document.getElementById("dibujo");

let tiempoAgotadoCallback = null;

areaJuego.classList.add("juego-inactivo");

/* ============================== DIFICULTAD ============================== */

document.querySelectorAll(".dif").forEach(btn => {
  btn.addEventListener("click", () => {

    btn.parentElement.querySelectorAll(".dif")
      .forEach(d => d.classList.remove("active"));
    btn.classList.add("active");

    const dificultad = parseInt(btn.dataset.dif);
    const categoria = btn.closest(".tema").id;

    let base = categoriasMap[categoria] || fallbackCategorias[categoria] || [];
    let filtradas = base;

    if (jsonCargadoCorrectamente) {
      filtradas = dataPalabrasFiltradas(categoria, dificultad);
    }

    if (filtradas.length === 0) {
      alert("No hay palabras disponibles para esa dificultad.");
      return;
    }

    areaJuego.classList.remove("juego-inactivo");
    jugar(filtradas);

    tematicasLista.style.pointerEvents = "none";
    tematicasLista.style.opacity = "0.4";
  });
});

/* ============================== LÓGICA DEL JUEGO ============================== */

function jugar(listaPalabras) {

  const palabraRandom = listaPalabras[Math.floor(Math.random()*listaPalabras.length)];

  const letras = palabraRandom.split("");
  const guiones = Array(letras.length).fill("_");

  palabra.innerText = guiones.join(" ");
  mensaje.innerText = "";

  [...letrasContenedor.children].forEach(b => {
    b.disabled = false;
    b.classList.remove("correcta","usada");
  });

  let maxIntentos = 6;
  intentos.textContent = maxIntentos;

  const dibujos = [
    "-----\n|   |\n    |\n    |\n    |\n_____",
    "-----\n|   |\nO   |\n    |\n    |\n_____",
    "-----\n|   |\nO   |\n|   |\n    |\n_____",
    "-----\n|   |\nO   |\n/|  |\n    |\n_____",
    "-----\n|   |\nO   |\n/|\\ |\n    |\n_____",
    "-----\n|   |\nO   |\n/|\\ |\n/   |\n_____",
    "-----\n|   |\nO   |\n/|\\ |\n/ \\ |\n_____"
  ];

  dibujo.textContent = dibujos[0];

  tiempoAgotadoCallback = () =>
    finalizarJuego(false, `⏳ Tiempo agotado. La palabra era: ${palabraRandom}`, palabraRandom, 0);

  iniciarContador();

  letrasContenedor.onclick = e => {
    if (!e.target.classList.contains("letra") || e.target.disabled) return;

    const letra = e.target.innerText.toLowerCase();
    e.target.disabled = true;

    if (letras.includes(letra)) {
      e.target.classList.add("correcta");

      letras.forEach((l,i) => {
        if (l === letra) guiones[i] = letra;
      });

      palabra.innerText = guiones.join(" ");

      if (!guiones.includes("_")) {
        finalizarJuego(true, "🎉 ¡Has ganado!", palabraRandom, maxIntentos);
      }

    } else {
      e.target.classList.add("usada");
      maxIntentos--;
      intentos.textContent = maxIntentos;
      dibujo.textContent = dibujos[6 - maxIntentos];

      if (maxIntentos === 0) {
        finalizarJuego(false, `💀 La palabra era: ${palabraRandom}`, palabraRandom, maxIntentos);
      }
    }
  };

  function finalizarJuego(ganado, texto, palabraRandom, intentosRestantes) {
    detenerContador();

    mensaje.innerText = texto;
    [...letrasContenedor.children].forEach(b => b.disabled = true);
    letrasContenedor.style.pointerEvents = "none";

    if (ganado) {
      const errores = 6 - intentosRestantes;
      const tiempoUsado = tiempoTranscurridoValor;
      guardarResultado(palabraRandom, errores, tiempoUsado);
    }
  }
}

/* ============================== FORMULARIO LOGIN ============================== */

const form = document.getElementById("form");
const nomusuari = document.getElementById("nomusuari");
const email = document.getElementById("email");
const contrasenya = document.getElementById("contrasenya");
const contrasenya2 = document.getElementById("contrasenya2");

function error(input, msg) {
  input.parentElement.classList.add("error");
  input.parentElement.querySelector("small").innerText = msg;
}

function correcto(input) {
  input.parentElement.classList.remove("error");
  input.parentElement.querySelector("small").innerText = "";
}

function validar() {
  let ok = true;

  if (nomusuari.value.trim() === "") { error(nomusuari, "Requerido"); ok = false; }
  else correcto(nomusuari);

  if (email.value.trim() === "") { error(email, "Requerido"); ok = false; }
  else correcto(email);

  if (contrasenya.value.trim().length < 6) { error(contrasenya, "Mínimo 6 caracteres"); ok = false; }
  else correcto(contrasenya);

  if (contrasenya2.value !== contrasenya.value) { error(contrasenya2, "No coinciden"); ok = false; }
  else correcto(contrasenya2);

  return ok;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if (validar()) {
    localStorage.setItem("usuarioAhorcado", nomusuari.value);
    contenedor.style.display = "none";
    popupRegistro.style.display = "none";
    tematicasLista.style.pointerEvents = "auto";
    tematicasLista.style.opacity = "1";
  }
});

/* ============================== ESTADÍSTICAS ============================== */

function guardarResultado(palabra, errores, tiempo) {
  let registros = JSON.parse(localStorage.getItem("resultadosAhorcado")) || {};

  if (!registros[palabra]) {
    registros[palabra] = {
      mejorTiempo: { tiempo, errores },
      menorErrores: { errores, tiempo }
    };
  } else {
    let r = registros[palabra];
    if (tiempo < r.mejorTiempo.tiempo) r.mejorTiempo = { tiempo, errores };
    if (errores < r.menorErrores.errores) r.menorErrores = { errores, tiempo };
  }

  localStorage.setItem("resultadosAhorcado", JSON.stringify(registros));
  mostrarEstadisticas();
}

function mostrarEstadisticas() {
  let registros = JSON.parse(localStorage.getItem("resultadosAhorcado")) || {};
  let tabla = document.getElementById("tablaStats");

  tabla.innerHTML = "";

  for (let pal in registros) {
    let r = registros[pal];
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${pal}</td>
      <td>${r.mejorTiempo.tiempo}</td>
      <td>${r.mejorTiempo.errores}</td>
      <td>${r.menorErrores.errores}</td>
      <td>${r.menorErrores.tiempo}</td>
    `;
    tabla.appendChild(fila);
  }
}

mostrarEstadisticas();

/* ============================== BOTÓN SESIÓN ============================== */

const btnSesion = document.getElementById("btnSesion");

btnSesion.addEventListener("click", () => {

  const usuario = localStorage.getItem("usuarioAhorcado");

  if (!usuario) {
    popupRegistro.style.display = "flex";
    contenedor.style.display = "flex";
    return;
  }

  popupLogout.style.display = "flex";
});

// BOTONES DEL POPUP LOGOUT

document.getElementById("logoutSi").addEventListener("click", () => {
  localStorage.removeItem("usuarioAhorcado");

  popupRegistro.style.display = "flex";
  contenedor.style.display = "flex";
  tematicasLista.style.pointerEvents = "none";
  tematicasLista.style.opacity = "0.4";

  popupLogout.style.display = "none";
});

document.getElementById("logoutNo").addEventListener("click", () => {
  popupLogout.style.display = "none";
});
