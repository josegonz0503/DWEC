const urlPalabrasEndPoint = "http://localhost:3000/palabras";

// Detectar si estamos en la página de lista de palabras o edición
const url = window.location.pathname;

if (url.includes("palabras-list.html")) {
    cargarPalabras();
} else if (url.includes("palabras-edit.html")) {
    const parametros = new URLSearchParams(window.location.search);
    const parametroId = parametros.get("id");
    if (parametroId) {
        cargarPalabra(parametroId);
    }
}

//  Cargar todas las palabras (lista)
async function cargarPalabras() {
    try {
        const response = await fetch(urlPalabrasEndPoint);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const palabras = await response.json();
        console.log("Palabras cargadas:", palabras);

        const listadoPalabras = document.getElementById("listado-palabras");

        if (Array.isArray(palabras) && palabras.length > 0) {
            listadoPalabras.innerHTML = palabras
                .map(
                    (palabra) => `
                        <div class="palabra-item">
                            <h3>${palabra.palabra}</h3>
                            <p><strong>ID:</strong> ${palabra.id}</p>
                            <p><strong>Dificultad:</strong> ${palabra.dificultad}</p>
                            <button class="editar" onclick="editarPalabra(${palabra.id})">Editar</button>
                            <button class="eliminar" onclick="eliminarPalabra(${palabra.id})">Eliminar</button>
                        </div>
                    `
                )
                .join("");
        } else {
            listadoPalabras.innerHTML = "<p>No hay palabras registradas.</p>";
        }
    } catch (error) {
        console.error("Error al cargar las palabras:", error);
        const listadoPalabras = document.getElementById("listado-palabras");
        listadoPalabras.innerHTML =
            "<p>Error al cargar las palabras. Intenta nuevamente más tarde.</p>";
    }
}

// Vincular evento del formulario (HTML: <form id="form-control">)
document.getElementById("form-control")?.addEventListener("submit", guardarPalabra);

//  Guardar o actualizar palabra
async function guardarPalabra(e) {
    e.preventDefault();

    let id = new URLSearchParams(window.location.search).get("id");
    id = id ? Number(id) : null;
    console.log("ID recibido:", id);

    let method = id ? "PUT" : "POST";
    let url = id ? `${urlPalabrasEndPoint}/${id}` : urlPalabrasEndPoint;

    let nuevoId = id;

    if (!id) {
        try {
            const resp = await fetch(urlPalabrasEndPoint);
            const palabras = await resp.json();

            if (palabras.length === 0) {
                nuevoId = 1;
            } else {
                const ultimo = palabras[palabras.length - 1].id;
                nuevoId = ultimo + 1;
            }

            console.log("Nuevo ID generado:", nuevoId);
        } catch (error) {
            console.error("Error obteniendo último ID:", error);
            alert("Error al generar el ID");
            return;
        }
    }

    const palabra = {
        id: nuevoId,
        palabra: document.getElementById("palabra").value,
        dificultad: Number(document.getElementById("dificultad").value)
    };

    console.log("Objeto a guardar:", palabra);

    //  por POST o PUT
    try {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(palabra),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        window.location.href = "palabras-list.html";
    } catch (error) {
        console.error("Error al guardar la palabra:", error);
        alert("Hubo un error al guardar la palabra.");
    }
}


async function cargarPalabra(id) {
    try {
        const response = await fetch(`${urlPalabrasEndPoint}/${id}`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const palabra = await response.json();

        document.getElementById("palabra").value = palabra.palabra;
        document.getElementById("dificultad").value = palabra.dificultad;
    } catch (error) {
        console.error("Error al cargar la palabra:", error);
        alert("No se pudo cargar la palabra para editar.");
    }
}

function editarPalabra(id) {
    window.location.href = `palabras-edit.html?id=${id}`;
}

async function eliminarPalabra(id) {
    if (!confirm("¿Seguro que quieres eliminar esta palabra?")) return;

    try {
        const response = await fetch(`${urlPalabrasEndPoint}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código HTTP: ${response.status}`);
        }

        alert("Palabra eliminada correctamente.");

        cargarPalabras();

    } catch (error) {
        console.error("Error al eliminar la palabra:", error);
        alert("No se pudo eliminar la palabra.");
    }
}
