// Mostrar checkbox cuando el usuario escriba su nombre
const nombreInput = document.getElementById("nombre");
const mayorContainer = document.getElementById("mayorDeEdadContainer");
const btnEntrar = document.getElementById("btnEntrar");
const mayorCheckbox = document.getElementById("mayorDeEdadCheckbox");

nombreInput.addEventListener("input", () => {
  mayorContainer.style.display = nombreInput.value.trim() ? "block" : "none";
});

// Función para guardar nombre y redirigir
btnEntrar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();

  if (!nombre) {
    mostrarMensajeGeneral("Por favor, ingresá tu nombre.", true);
    return;
  }

  if (!mayorCheckbox.checked) {
    mostrarMensajeGeneral("Debes confirmar que sos mayor de 18 años para continuar.", true);
    return;
  }

  localStorage.setItem("usuarioNombre", nombre);
  window.location.href = "main.html";
});

// Mostrar mensajes en DOM
function mostrarMensajeGeneral(texto, error = false) {
  const span = mayorContainer.querySelector("span");
  span.textContent = texto;
  span.style.color = error ? "red" : "green";

  setTimeout(() => {
    span.textContent = "";
  }, 3000);
}
