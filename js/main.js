// Mostrar saludo al cargar la página
function mostrarSaludo() {
  const saludo = document.getElementById("saludo");
  const nombre = localStorage.getItem("usuarioNombre");

  if (nombre) {
    saludo.textContent = `Hola, ${nombre}! Bienvenido a la página.`;
  } else {
    saludo.textContent = "No encontramos tu nombre. Volvé a la página anterior.";
  }
}

// Carrito: array de objetos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar carrito en DOM
function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<li>El carrito está vacío.</li>";
    return;
  }

  carrito.forEach((prod, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${i + 1}. ${prod.nombre} — $${prod.precio.toFixed(2)}  
      (Stock: ${prod.stock}, Cantidad: ${prod.cantidad})
    `;
    lista.appendChild(li);
  });
}

// Vaciar carrito
function vaciarCarrito() {
  if (carrito.length === 0) {
    mostrarMensaje("El carrito ya está vacío.", true);
    return;
  }

  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  mostrarMensaje("Carrito vaciado correctamente.");
}

// Mensajes en DOM
function mostrarMensaje(texto, error = false) {
  const div = document.getElementById("mensajeCarrito");
  div.textContent = texto;
  div.style.color = error ? "red" : "green";

  setTimeout(() => {
    div.textContent = "";
  }, 3000);
}

// Agregar producto
document.addEventListener("DOMContentLoaded", () => {
  mostrarSaludo();
  mostrarCarrito();

  const form = document.getElementById("formProducto");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("productoNombre").value.trim();
    const precio = parseFloat(document.getElementById("productoPrecio").value);
    const stock = parseInt(document.getElementById("productoStock").value);

    if (!nombre || isNaN(precio) || precio <= 0 || isNaN(stock) || stock <= 0) {
      mostrarMensaje("Por favor, completá todos los datos válidamente.", true);
      return;
    }

    // Validar duplicado y sumar cantidad
    const existente = carrito.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (existente) {
      existente.cantidad += 1;
      mostrarMensaje(`Se sumó 1 al producto "${nombre}" existente.`);
    } else {
      carrito.push({ nombre, precio, stock, cantidad: 1 });
      mostrarMensaje(`Agregaste "${nombre}" al carrito.`);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    form.reset();
  });

  document.getElementById("btnMostrar").addEventListener("click", mostrarCarrito);
  document.getElementById("btnVaciar").addEventListener("click", vaciarCarrito);
});
