// Simular un servidor con asincronía
function fetchProductAsync() {
    return new Promise((resolve) => {
        setTimeout(() => { // corregido: era 'seetTimeout'
            resolve([
                { id: 1, name: 'Pelota de fútbol', price: 20 },
                { id: 2, name: 'Raqueta de tenis', price: 50 }
            ]);
        }, 10000); // Simula 10 segundos de espera
    });
}

// Mostrar los productos con asincronía
async function displayProducts() {
    const products = document.getElementById('products');
    products.innerHTML = "<p>Cargando productos...</p>";

    // Llamada NO bloqueante (corregido: nombre correcto de la función)
    const productsFunction = await fetchProductAsync();

    // Mostrar los productos en pantalla
    products.innerHTML = productsFunction
        .map((p) => `<p>${p.name} - ${p.price}€</p>`)
        .join('');
}

// Evento para añadir producto simulando asincronía
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    // Simular guardado en servidor con retardo
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Producto ${name} con precio ${price}€ añadido correctamente.`);
            resolve(); // importante: cerrar la promesa
        }, 1000);
    });
});

// Llamar a displayProducts al cargar la página
displayProducts();
