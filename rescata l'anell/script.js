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
  
  if(inici.disabled) return;
  
  inici.disabled = true;
  missatge.textContent = "";

  compteEnreraValor = 10;
  tempsTranscorregutValor = 0;

  // Mostrar l'anell
  mostrarAnell();

  compteEnrera.textContent = `Temps restant: ${compteEnreraValor}`;
  compteEnreraInterval = setInterval(()=>{
    compteEnreraValor--;
    compteEnrera.textContent = `Temps restant: ${compteEnreraValor}`;
    if(compteEnreraValor <= 0) {
      finalJoc(false);
    }
  }, 1000);

  tempsTranscorregut.textContent = `Temps transcorregut: ${tempsTranscorregutValor}`;
  tempsTranscorregutInterval = setInterval(()=>{
    tempsTranscorregutValor++;
    tempsTranscorregut.textContent = `Temps transcorregut: ${tempsTranscorregutValor}`;
  }, 1000);

  anell.addEventListener('click', rescataAnell);

  anell.style.display = "block";
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

  if(esGanador) {
    missatge.textContent = `Enhorabona! Has rescatat l'Anell en ${tempsTranscorregutValor}.`;
  } else {
    missatge.textContent = `Has perdut! L'Anell ha caigut a les ombres de Mordor`;
  }
}

function rescataAnell() {
  finalJoc(true);
}

inici.addEventListener('click', iniciJoc);