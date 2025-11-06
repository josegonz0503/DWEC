const compteEnrera = document.getElementById("compteEnrera");
const tempsTranscorregut = document.getElementById("tempsTranscorregut");
const inici = document.getElementById("inici");
const anell = document.getElementById("anell");
const missatge = document.getElementById("missatge");
const areajoc = document.getElementById("areajoc");

let compteEnreraValor = 10;
let tempsTranscorregutValor = 0;
let compteEnreraInterval;
let tempsTranscorregutInterval;

function iniciJoc() {
    if (inici.disabled) return;

    inici.disabled = true;
    missatge.textContent = ""; // limpia el mensaje anterior

    compteEnreraValor = 10; // valor inicial del contador
    tempsTranscorregutValor = 0;

    mostrarAnell();

    // Reiniciar textos
    compteEnrera.textContent = `Temps restant: ${compteEnreraValor}`;
    tempsTranscorregut.textContent = `Temps transcorregut: ${tempsTranscorregutValor}`;

    // Empieza el contador regresivo
    compteEnreraInterval = setInterval(() => {
        compteEnreraValor--;
        compteEnrera.textContent = `Temps restant: ${compteEnreraValor}`;

        if (compteEnreraValor <= 0) {
            finalJoc(false); // pierde si se acaba el tiempo
        }
    }, 1000);

    // Contador de tiempo transcurrido
    tempsTranscorregutInterval = setInterval(() => {
        tempsTranscorregutValor++;
        tempsTranscorregut.textContent = `Temps transcorregut: ${tempsTranscorregutValor}`;
    }, 1000);

    // Hacer visible el anillo y añadir evento
    anell.style.display = "block";
    anell.addEventListener('click', rescataAnell);
}

function mostrarAnell() {
    const maxX = areajoc.clientWidth - anell.offsetWidth;
    const maxY = areajoc.clientHeight - anell.offsetHeight;
    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));
    anell.style.left = randomX + "px";
    anell.style.top = randomY + "px";
}

function finalJoc(esGanador) {
    clearInterval(compteEnreraInterval);
    clearInterval(tempsTranscorregutInterval);

    anell.style.display = "none";
    inici.disabled = false;
    anell.removeEventListener('click', rescataAnell);

    if (esGanador) {
        missatge.textContent = `🎉 Enhorabona! Has rescatat l'Anell en ${tempsTranscorregutValor} segons.`;
    } else {
        missatge.textContent = `😢 Has perdut! L'Anell ha caigut a les ombres de Mordor.`;
    }
}

function rescataAnell() {
    finalJoc(true);
}

inici.addEventListener('click', iniciJoc);
