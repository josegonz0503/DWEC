/* ================================================================
   CRUD DE PALABRAS (CON CATEGORÍAS)
   ============================================================== */

const urlPalabrasEndPoint = "http://localhost:3000/palabras";

// Detectar si estamos en la página de lista de palabras o edición
const url = window.location.pathname;

if (url.includes("palabras-list.html")) {
    cargarPalabras();
} 
else if (url.includes("palabras-edit.html")) {
    const parametros = new URLSearchParams(window.location.search);
    const parametroId = parametros.get("id");
    if (parametroId) cargarPalabra(parametroId);
}

/* ================================================================
   CARGAR LISTA DE PALABRAS
   ============================================================== */

async function cargarPalabras() {
    try {
        const response = await fetch(urlPalabrasEndPoint);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const palabras = await response.json();
        console.log("Palabras cargadas:", palabras);

        const listado = document.getElementById("listado-palabras");

        if (!Array.isArray(palabras) || palabras.length === 0) {
            listado.innerHTML = `<tr><td colspan="5">No hay palabras registradas.</td></tr>`;
            return;
        }

        listado.innerHTML = palabras
            .map(
                p => `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.palabra}</td>
                    <td>${p.categoria}</td>
                    <td>${p.dificultad}</td>
                    <td>
                        <button class="editar" onclick="editarPalabra(${p.id})">Editar</button>
                        <button class="eliminar" onclick="eliminarPalabra(${p.id})">Eliminar</button>
                    </td>
                </tr>
            `
            )
            .join("");

    } catch (error) {
        console.error("Error al cargar las palabras:", error);
        document.getElementById("listado-palabras").innerHTML =
            `<tr><td colspan="5">Error al cargar las palabras.</td></tr>`;
    }
}

/* ================================================================
   GUARDAR / EDITAR UNA PALABRA
   ============================================================== */

document.getElementById("form-control")?.addEventListener("submit", guardarPalabra);

async function guardarPalabra(e) {
    e.preventDefault();

    let id = new URLSearchParams(window.location.search).get("id");
    id = id ? Number(id) : null;

    let method = id ? "PUT" : "POST";
    let endpoint = id ? `${urlPalabrasEndPoint}/${id}` : urlPalabrasEndPoint;
    let nuevoId = id;

    if (!id) {
        try {
            const resp = await fetch(urlPalabrasEndPoint);
            const palabras = await resp.json();
            nuevoId = palabras.length ? palabras[palabras.length - 1].id + 1 : 1;
        } catch (err) {
            alert("Error al generar el ID.");
            return;
        }
    }

    const palabra = {
        id: nuevoId,
        palabra: document.getElementById("palabra").value.trim(),
        categoria: document.getElementById("categoria").value,
        dificultad: Number(document.getElementById("dificultad").value)
    };

    console.log("OBJETO A GUARDAR:", palabra);

    try {
        const response = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(palabra)
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        window.location.href = "palabras-list.html";

    } catch (error) {
        console.error("Error al guardar la palabra:", error);
        alert("Hubo un error al guardar la palabra.");
    }
}

/* ================================================================
   CARGAR UNA PALABRA PARA EDITAR
   ============================================================== */

async function cargarPalabra(id) {
    try {
        const response = await fetch(`${urlPalabrasEndPoint}/${id}`);

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const palabra = await response.json();

        document.getElementById("palabra").value = palabra.palabra;
        document.getElementById("categoria").value = palabra.categoria;
        document.getElementById("dificultad").value = palabra.dificultad;

    } catch (error) {
        console.error("Error al cargar la palabra:", error);
        alert("No se pudo cargar la palabra para editar.");
    }
}

/* ================================================================
   NAVEGAR A EDITAR
   ============================================================== */

function editarPalabra(id) {
    window.location.href = `palabras-edit.html?id=${id}`;
}

/* ================================================================
   ELIMINAR PALABRA
   ============================================================== */

async function eliminarPalabra(id) {
    if (!confirm("¿Seguro que quieres eliminar esta palabra?")) return;

    try {
        const response = await fetch(`${urlPalabrasEndPoint}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        alert("Palabra eliminada correctamente.");
        cargarPalabras();

    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar la palabra.");
    }
}
