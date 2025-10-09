// ====== Mostrar saludo ======
function mostrarSaludo() {
  const saludo = document.getElementById("saludo");
  const nombre = localStorage.getItem("usuarioNombre");
  saludo.textContent = nombre ? `Hola, ${nombre}! 🍷` : "Bienvenido a la vinoteca virtual.";
}

// ====== Carrito ======
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ====== Cargar productos desde JSON ======
async function cargarProductos() {
  try {
    const res = await fetch("./data/vinos.json");
    const productos = await res.json();
    mostrarProductos(productos);
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar los vinos", "error");
  }
}

// ====== Mostrar cards de productos ======
function mostrarProductos(lista) {
  const contenedor = document.getElementById("productosContainer");
  contenedor.innerHTML = "";

  lista.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card-vino");
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="desc">${prod.descripcion}</p>
      <p class="precio">$${prod.precio.toFixed(2)}</p>
      <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  const botones = document.querySelectorAll(".btn-agregar");
  botones.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarrito(id, lista);
    });
  });
}

// ====== Agregar producto al carrito ======
function agregarAlCarrito(id, productos) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad += 1;
    mostrarToast(`Se agregó otra unidad de ${producto.nombre}`);
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    mostrarToast(`Agregaste ${producto.nombre} al carrito`);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ====== Mostrar carrito (modal con eliminar) ======
function verCarrito() {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "Aún no agregaste vinos.", "info");
    return;
  }

  let html = "<ul style='list-style:none; padding:0; text-align:left'>";
  let total = 0;

  carrito.forEach((prod) => {
    total += prod.precio * prod.cantidad;
    html += `
      <li style="margin-bottom:10px">
        <strong>${prod.nombre}</strong> x${prod.cantidad} — $${(prod.precio * prod.cantidad).toFixed(2)}
        <button class="btn-eliminar" data-id="${prod.id}" 
          style="margin-left:10px; background:#ff6b6b; border:none; color:white; border-radius:5px; padding:2px 8px; cursor:pointer;">
          🗑️
        </button>
      </li>`;
  });

  html += `</ul><hr><strong>Total: $${total.toFixed(2)}</strong>`;

  Swal.fire({
    title: "🛒 Tu carrito",
    html,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "Vaciar carrito",
    cancelButtonText: "Cerrar",
    confirmButtonColor: "#6a5acd",
    cancelButtonColor: "#3085d6",
    didOpen: () => {
      const botonesEliminar = Swal.getHtmlContainer().querySelectorAll(".btn-eliminar");
      botonesEliminar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = parseInt(e.target.dataset.id);
          eliminarProducto(id);
          Swal.close();
          verCarrito(); // refrescar modal
        });
      });
    },
  }).then((res) => {
    if (res.isConfirmed) {
      vaciarCarrito();
    }
  });
}

// ====== Eliminar producto individual ======
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarToast("Producto eliminado del carrito");
}

// ====== Vaciar carrito ======
function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarToast("Carrito vaciado correctamente");
}

// ====== Toast rápido arriba a la derecha ======
function mostrarToast(texto, error = false) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: error ? "error" : "success",
    title: texto,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}

// ====== Inicio ======
document.addEventListener("DOMContentLoaded", () => {
  mostrarSaludo();
  cargarProductos();
  document.getElementById("btnCarritoIcono").addEventListener("click", verCarrito);
});
