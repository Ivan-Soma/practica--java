// ========================
// Funciones para la gestión de usuario y carrito
// ========================

// Guardar nombre y redirigir a la página principal
function guardarNombre() {
  const nombreInput = document.getElementById("nombre");
  const mayorCheckbox = document.getElementById("mayorDeEdadCheckbox");

  const nombre = nombreInput.value.trim();

  // Validar nombre ingresado
  if (nombre === "") {
    alert("Por favor, ingresá tu nombre.");
    return;
  }

  // Validar edad
  if (!mayorCheckbox.checked) {
    alert("Debes confirmar que sos mayor de 18 años para continuar.");
    return;
  }

  // Almacenar nombre en localStorage y redirigir
  localStorage.setItem("usuarioNombre", nombre);
  window.location.href = "main.html";
}

// Mostrar saludo en la página principal
function mostrarSaludo() {
  const saludo = document.getElementById("saludo");
  if (!saludo) return;

  const nombre = localStorage.getItem("usuarioNombre");
  if (nombre) {
    saludo.textContent = `Hola, ${nombre}! Bienvenido a la página.`;
  } else {
    saludo.textContent = "No encontramos tu nombre. Volvé a la página anterior.";
  }
}

// ========================
// Animación de partículas al entrar en la card
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector('.card');
  
  if (card) {
    card.addEventListener('mouseenter', () => {
      const particles = document.createElement('div');
      particles.className = 'absolute inset-0 pointer-events-none';
      particles.innerHTML = `
        <div class="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style="animation-delay: 0.1s"></div>
        <div class="absolute top-1/4 right-0 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style="animation-delay: 0.3s"></div>
        <div class="absolute bottom-0 left-0 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style="animation-delay: 0.5s"></div>
      `;
      card.appendChild(particles);
      setTimeout(() => particles.remove(), 1000);
    });
  }

  const nombreInput = document.getElementById("nombre");
  const mayorContainer = document.getElementById("mayorDeEdadContainer");
  
  if (nombreInput && mayorContainer) {
    nombreInput.addEventListener("input", () => {
      // Mostrar/ocultar el contenedor de mayor de edad
      if (nombreInput.value.trim().length > 0) {
        mayorContainer.style.display = "block";
      } else {
        mayorContainer.style.display = "none";
        document.getElementById("mayorDeEdadCheckbox").checked = false;
      }
    });
  }

  mostrarSaludo();
});

// ========================
// Lógica del carrito
// ========================
let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito() {
  const producto = prompt("Ingresa un producto para agregar al carrito:");

  if (!producto || producto.trim() === "") {
    alert("No ingresaste ningún producto.");
    return;
  }

  carrito.push(producto.trim());
  console.log("Carrito actual:", carrito);
  alert(`Agregaste "${producto}" al carrito.`);
  mostrarCarrito();
}

// Mostrar productos en el carrito
function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  if (!lista) return;

  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<li>El carrito está vacío.</li>";
    return;
  }

  for (let i = 0; i < carrito.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${carrito[i]}`;
    lista.appendChild(li);
  }
}

// Vaciar el carrito
function vaciarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }

  const confirmacion = confirm("¿Querés vaciar el carrito?");
  if (confirmacion) {
    carrito = [];
    const lista = document.getElementById("listaCarrito");
    if (lista) lista.innerHTML = "<li>El carrito está vacío.</li>";
    alert("El carrito se vació correctamente.");
  }
}
