// Simulación de un servidor con tiempo de espera.
function fetchProductSync() {
    const start = Date.now();

    // Ciclo de espera simula un retraso de 10 segundos (sin bloquear el hilo)
    while (Date.now() - start < 10000) {
        console.log("Cargando...");
    }

    return [
        { id: 1, name: 'Pelota de fútbol', price: 20 },
        { id: 2, name: 'Raqueta de tenis', price: 50 }
    ];
}

// Mostrar los productos sin asíncronía
function displayProducts() {
    const products = document.getElementById('products');
    products.innerHTML = "<p>Cargando productos...</p>";

    // Llamada bloqueante
    const productsFunction = fetchProductSync();

    // Corregir el mapeo de productos y devolver correctamente el HTML
    products.innerHTML = productsFunction
        .map((p) => {
            return `<p>${p.name} - ${p.price}€</p>`; // Se debe devolver el HTML de cada producto
        })
        .join(''); // Unir los productos en un solo bloque de HTML
}

// Evento para cargar los productos al hacer clic en el botón
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("No se pueden añadir productos mientras se cargan los existentes.");
});

// Llamar a displayProducts para mostrar los productos cuando se carga la página
displayProducts();
