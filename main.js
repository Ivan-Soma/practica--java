// Función para guardar el nombre y redirigir
function guardarNombre() {
  const nombreInput = document.getElementById("nombre");
  if (!nombreInput) return;

  const nombre = nombreInput.value.trim();
  if (nombre === "") {
    alert("Por favor, ingresá tu nombre.");
    return;
  }

  localStorage.setItem("usuarioNombre", nombre);
  window.location.href = "main.html";
}

// Función para mostrar el saludo
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

// Animación partículas al entrar en la card
document.querySelector('.card').addEventListener('mouseenter', () => {
  const particles = document.createElement('div');
  particles.className = 'absolute inset-0 pointer-events-none';
  particles.innerHTML = `
    <div class="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style="animation-delay: 0.1s"></div>
    <div class="absolute top-1/4 right-0 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style="animation-delay: 0.3s"></div>
    <div class="absolute bottom-0 left-0 w-1 h-1 bg-purple-400 rounded-full opacity-70 animate-ping" style="animation-delay: 0.5s"></div>
  `;
  document.querySelector('.card').appendChild(particles);
  setTimeout(() => particles.remove(), 1000);
});

// Mostrar selector de mayor de edad al empezar a escribir nombre
const nombreInput = document.getElementById("nombre");
const mayorContainer = document.getElementById("mayorDeEdadContainer");

nombreInput.addEventListener("input", () => {
  if (nombreInput.value.trim().length > 0) {
    mayorContainer.style.display = "block";
  } else {
    mayorContainer.style.display = "none";
    // También podría desmarcar checkbox si querés
    document.getElementById("mayorDeEdadCheckbox").checked = false;
  }
});

// Modificar función guardarNombre para validar mayor de edad
function guardarNombre() {
  const nombre = nombreInput.value.trim();
  const mayorCheckbox = document.getElementById("mayorDeEdadCheckbox");

  if (nombre === "") {
    alert("Por favor, ingresá tu nombre.");
    return;
  }

  if (!mayorCheckbox.checked) {
    alert("Debes confirmar que sos mayor de 18 años para continuar.");
    return;
  }

  localStorage.setItem("usuarioNombre", nombre);
  window.location.href = "main.html";
}


// Ejecutamos la función mostrarSaludo al cargar el DOM
document.addEventListener("DOMContentLoaded", mostrarSaludo);
