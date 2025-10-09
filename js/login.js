// Mostrar checkbox cuando el usuario escriba su nombre
const nombreInput = document.getElementById("nombre");
const mayorContainer = document.getElementById("mayorDeEdadContainer");
const btnEntrar = document.getElementById("btnEntrar");
const mayorCheckbox = document.getElementById("mayorDeEdadCheckbox");

nombreInput.addEventListener("input", () => {
  mayorContainer.style.display = nombreInput.value.trim() ? "block" : "none";
});

// Función principal al presionar "Entrar"
btnEntrar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();

  if (!nombre) {
    Swal.fire({
      icon: "warning",
      title: "Falta tu nombre",
      text: "Por favor, ingresá tu nombre para continuar.",
      confirmButtonColor: "#6a5acd",
    });
    return;
  }

  if (!mayorCheckbox.checked) {
    Swal.fire({
      icon: "error",
      title: "Confirmación necesaria",
      text: "Debes confirmar que sos mayor de 18 años para continuar.",
      confirmButtonColor: "#d33",
    });
    return;
  }

  localStorage.setItem("usuarioNombre", nombre);

  Swal.fire({
    icon: "success",
    title: `¡Bienvenido, ${nombre}!`,
    text: "Serás redirigido a la tienda.",
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "main.html";
  });
});

// (Extra) Efecto de movimiento en el fondo
document.addEventListener("mousemove", (e) => {
  const fondo = document.getElementById("fondo");
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;
  fondo.style.transform = `translate(${x}px, ${y}px)`;
});
