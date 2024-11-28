const productos = [
    { id: 1, img: "https://home.ripley.com.pe/Attachment/WOP_5/2020329670287/2020329670287-3.jpg", nombre: "Camiseta", precio: 20, unidades: 20 },
    { id: 2, img: "https://arocauniformes.com/wp-content/uploads/2021/07/PANTALON1.jpg", nombre: "Pantalón", precio: 35, unidades: 20 },
    { id: 3, img: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/115346018_01/w=1500,h=1500,fit=pad", nombre: "Zapatos", precio: 50, unidades: 20 },
    { id: 4, img: "https://http2.mlstatic.com/D_NQ_NP_952127-MPE45408776869_042021-O.webp", nombre: "Polera", precio: 15, unidades: 20 },
    { id: 5, img: "https://belcorpperu.vtexassets.com/arquivos/ids/305891-800-800?v=638520696195100000&width=800&height=800&aspect=true", nombre: "Anillos", precio: 23, unidades: 20 },
    { id: 6, img: "https://cdn-media.glamira.com/media/product/newgeneration/view/1/sku/rope4-75mm/alloycolour/yellow.jpg", nombre: "Cadenas", precio: 37, unidades: 20 }
];

const listaproductos = document.getElementById('listaproductos');
const listaCompra = document.getElementById('listaCompra');
const totalCompra = document.getElementById('totalCompra');
const eliminarCompra = document.getElementById('eliminarCompra');
const comprar = document.getElementById('comprar');

let sumaTotal = 0;
let ListaDeProductosComprados = "";
eliminarCompra.style.display = "none";
comprar.style.display = "none";

// Crear la lista de productos
productos.forEach(producto => {
    listaproductos.innerHTML += `
    <div id="card-${producto.id}" class="card">
        <div class="card__img">
            <img src="${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="card__info">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <p>Unidades: ${producto.unidades}</p>
            <button id="${producto.id}" class="bto">Agregar</button>
        </div>
    </div>`;
});

// Manejar evento de agregar al carrito
document.querySelectorAll('.bto').forEach(button => {
    button.addEventListener('click', () => {
        const idProducto = Number(button.id);
        const producto = productos.find(p => p.id === idProducto);

        if (producto.unidades > 0) {
            producto.unidades--;
            sumaTotal += producto.precio;
            ListaDeProductosComprados += `${producto.nombre}: $${producto.precio}\n`;
            
            // Actualizar la vista del carrito
            listaCompra.innerHTML += `<li>${producto.nombre}: $${producto.precio}</li>`;
            totalCompra.textContent = `Total a pagar: $${sumaTotal}`;

            // Actualizar unidades en la tarjeta
            const card = document.getElementById(`card-${producto.id}`);
            const cantidad = card.querySelector('p:nth-of-type(2)');
            cantidad.textContent = `Unidades: ${producto.unidades}`;

            if (listaCompra.children.length > 0) {
                eliminarCompra.style.display = "block";
                comprar.style.display = "block";
            }
        } else {
            alert("No hay unidades disponibles de este producto.");
        }
    });
});

// Manejar evento de eliminar compra
eliminarCompra.addEventListener('click', () => {
    // Restaurar las unidades de los productos y limpiar el carrito
    productos.forEach(producto => producto.unidades = 20);
    sumaTotal = 0;
    ListaDeProductosComprados = "";

    // Limpiar la vista
    listaCompra.innerHTML = "";
    totalCompra.textContent = "";
    eliminarCompra.style.display = "none";
    comprar.style.display = "none";

    // Restaurar las unidades en las tarjetas
    productos.forEach(producto => {
        const card = document.getElementById(`card-${producto.id}`);
        const cantidad = card.querySelector('p:nth-of-type(2)');
        cantidad.textContent = `Unidades: ${producto.unidades}`;
    });
});

// Manejar evento de compra
comprar.addEventListener('click', () => {
    alert(`Compra realizada:\n${ListaDeProductosComprados}\nTotal: $${sumaTotal}\n¡Gracias por tu compra!`);

    // Limpiar después de la compra
    listaCompra.innerHTML = "";
    totalCompra.textContent = "";
    eliminarCompra.style.display = "none";
    comprar.style.display = "none";
    sumaTotal = 0;
    ListaDeProductosComprados = "";
});