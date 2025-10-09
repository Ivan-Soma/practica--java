# 🍷 **Proyecto Final - Simulador de Vinoteca Interactiva**

Este proyecto es un **simulador interactivo de compra de vinos**, desarrollado con **HTML, CSS y JavaScript**.  
Simula el flujo completo de un **E-commerce**, desde el ingreso del usuario hasta la gestión de un **carrito de compras funcional**, utilizando datos remotos y almacenamiento local.

---

## 🚀 **Características principales**

✅ **Inicio interactivo**
- Pantalla de bienvenida donde el usuario ingresa su nombre y confirma ser mayor de edad.  
- Los datos se guardan en `localStorage` para personalizar la experiencia.

✅ **Catálogo dinámico de vinos**
- Los productos (5 variedades de vino) se cargan desde un archivo `JSON` externo mediante `fetch`.  
- Cada vino se muestra como una **card visual**, con imagen, descripción, precio y botón para agregar al carrito.

✅ **Carrito funcional**
- El usuario puede:
  - Agregar productos al carrito.
  - Ver el detalle de su compra en un modal moderno.
  - Eliminar productos individualmente 🗑️.
  - Vaciar todo el carrito con confirmación.
- Todo se guarda en `localStorage`, conservando los datos aunque se recargue la página.

✅ **Interfaz moderna**
- Estilos creados con **CSS puro**, incluyendo fondos, tarjetas con efectos, animaciones y diseño responsive.
- Ventanas emergentes personalizadas con **SweetAlert2** (reemplazo de `alert`, `prompt`, `confirm`).

---

## 🧠 **Tecnologías utilizadas**

| Tipo | Herramienta |
|------|--------------|
| Lenguaje principal | JavaScript (ES6+) |
| Librería externa | SweetAlert2 |
| Estilos | CSS3 |
| Estructura | HTML5 |
| Almacenamiento | localStorage |
| Datos remotos | JSON simulado (`data/vinos.json`) |

---


