// Seleccionar elementos del DOM
const contenedor = document.querySelector(".contenedor");
const asientos = document.querySelectorAll(".fila .asiento:not(.ocupado)");
const contador = document.getElementById("contador");
const total = document.getElementById("total");
const peliculaSelect = document.getElementById("pelicula");

// Establecer precio inicial
let precioDelTicket = +peliculaSelect.value;

// Función para actualizar el conteo de asientos seleccionados y el total
function actualizarSeleccionAsientos() {
    const asientosSeleccionados = document.querySelectorAll(".fila .asiento.seleccionado");

    const indices = [...asientosSeleccionados].map(asiento =>
        [...asientos].indexOf(asiento)
    );

    // Guardar en localStorage
    localStorage.setItem("asientosSeleccionados", JSON.stringify(indices));

    // Actualizar contador y total
    const cantidad = asientosSeleccionados.length;
    contador.innerText = cantidad;
    total.innerText = cantidad * precioDelTicket;
}

// Función para guardar info de película seleccionada
function guardarInfoPelicula(indicePelicula, precioPelicula) {
    localStorage.setItem("indicePeliculaSeleccionada", indicePelicula);
    localStorage.setItem("precioPeliculaSeleccionada", precioPelicula);
}

// Función para restaurar selección desde localStorage
function llenarUI() {
    // Obtener seleccionados y ocupados del localStorage
    const seleccionados = JSON.parse(localStorage.getItem("asientosSeleccionados")) || [];
    const ocupadosGuardados = JSON.parse(localStorage.getItem("asientosOcupados")) || [];

    // Fusionar seleccionados con ocupados anteriores, evitando duplicados
    const nuevosOcupados = [...new Set([...ocupadosGuardados, ...seleccionados])];

    // Guardar de nuevo en localStorage
    localStorage.setItem("asientosOcupados", JSON.stringify(nuevosOcupados));

    // Limpiar seleccionados (ya se convirtieron en ocupados)
    localStorage.removeItem("asientosSeleccionados");

    // Marcar en la interfaz los asientos ocupados
    asientos.forEach((asiento, index) => {
        if (nuevosOcupados.includes(index)) {
            asiento.classList.add("ocupado");
        }
    });

    // Restaurar película seleccionada
    const indicePeliculaSeleccionada = localStorage.getItem("indicePeliculaSeleccionada");
    if (indicePeliculaSeleccionada !== null) {
        peliculaSelect.selectedIndex = indicePeliculaSeleccionada;

        const precioPeliculaSeleccionada = localStorage.getItem("precioPeliculaSeleccionada");
        if (precioPeliculaSeleccionada !== null) {
            precioDelTicket = +precioPeliculaSeleccionada;
        }
    }

    actualizarSeleccionAsientos();
}



// EVENTOS

// Evento para seleccionar o deseleccionar asientos
contenedor.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("asiento") &&
        !e.target.classList.contains("ocupado")
    ) {
        e.target.classList.toggle("seleccionado");
        actualizarSeleccionAsientos();
    }
});

// Evento para cambio de película
peliculaSelect.addEventListener("change", (e) => {
    precioDelTicket = +e.target.value;
    guardarInfoPelicula(e.target.selectedIndex, e.target.value);
    actualizarSeleccionAsientos();
});

// Inicializar UI al cargar
llenarUI();
