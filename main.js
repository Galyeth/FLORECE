// Selecciona el botón de hamburguesa
const btn = document.querySelector(".menu-toggle");

// Selecciona el menú horizontal
const menu = document.querySelector(".menu-horizontal");

// Al hacer clic en el botón de hamburguesa
btn.addEventListener("click", () => {
  // Alterna (agrega o quita) la clase "active" en el menú
  // Esto hace que se muestre o se oculte
  menu.classList.toggle("active");

  // (opcional) También puedes alternar una clase en el botón si quieres cambiar su apariencia
  // btn.classList.toggle("open");
});

// Evento al enviar el formulario de contacto
// document.getElementById("formularioContacto").addEventListener("submit", function (e) {
//   e.preventDefault(); // Evita el envío real del formulario

//   // Muestra el mensaje de confirmación
//   const mensaje = document.getElementById("mensajeEnviado");
//   mensaje.style.display = "block";

//   // Opcional: limpiar el formulario
//   this.reset();

//   // Ocultar mensaje después de 5 segundos
//   setTimeout(() => {
//     mensaje.style.display = "none";
//   }, 5000);
// });

// // VALIDACION DE FORMULARIO
const form = document.querySelector('form[name="frm"]');
form.addEventListener("submit", (event) => {
  const fname = form.elements["nombres"].value;
  const flastname = form.elements["apellidos"].value;
  const femail = form.elements["email"].value;
  const fphone = form.elements["telefono"].value;

  if (!fname || !flastname || !femail || !fphone) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del formulario");
  } else if (!validateEmail(femail)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo valido");
  } else {
    const confirmation = confirm(
      "Esta a punto de enviar el formulario, ¿Desea Continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
    }
  }
});


//CREAR FUNCION validateEmail(femail)
function validateEmail(femail) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail).toLowerCase());
}



// REGISTRO DE USUARIO
// Mostrar la sección de registro al hacer clic en "Registrate"
document.querySelectorAll(".ir-a-registro").forEach(enlace => {
  enlace.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll("section").forEach( sec => {
      if (sec.id !== "seccion-registro") {
        sec.style.display = "none";
      }
    });
    document.querySelector("nav").style.display = "none";
    document.getElementById("seccion-registro").style.display = "block"; // Mostrar solo la sección de registro
    document.getElementById("seccion-registro").scrollIntoView({ behavior: "smooth" }); // (Opcional) Hacer scroll hasta esa sección
  });
});

document.querySelectorAll(".ir-a-login").forEach(enlace => {
  enlace.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll("section").forEach(sec => {
      if (sec.id !== "seccion-login") {
        sec.style.display = "none";
      }
    });
    document.querySelector("nav").style.display = "none";
    document.getElementById("seccion-login").style.display = "block";
    document.getElementById("seccion-login").scrollIntoView({ behavior: "smooth" });
  });
});

const modalRegistro = document.getElementById("modalRegistro");
const btnIrLogin = document.getElementById("btnIrLogin");

document.getElementById("formRegistro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("registroNombre").value.trim();
  const email = document.getElementById("registroEmail").value.trim();
  const password = document.getElementById("registroPassword").value;

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  if (localStorage.getItem(email)) {
    alert("Este correo ya está registrado.");
    return;
  }

  const usuario = { nombre, email, password };
  localStorage.setItem(email, JSON.stringify(usuario));

  modalRegistro.classList.remove("hidden"); // Mostrar modal
  e.target.reset(); // Limpiar formulario
});


// Cerrar modal y redirigir a sección de login
btnIrLogin.addEventListener("click", () => {
  modalRegistro.classList.add("hidden");
  // Ocultar registro y mostrar login
  document.getElementById("seccion-registro").style.display = "none";
  document.getElementById("seccion-login").style.display = "block";
  document.getElementById("seccion-login").scrollIntoView({ behavior: "smooth" });
});



const modalLogin = document.getElementById("modalLogin");
const btnLoginExito = document.getElementById("btnLoginExito");

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const userData = localStorage.getItem(email);
  if (!userData) {
    alert("Este correo no está registrado.");
    return;
  }
  const usuario = JSON.parse(userData);
  if (usuario.password !== password) {
    alert("Contraseña incorrecta.");
    return;
  }
  modalLogin.classList.remove("hidden"); // Mostrar modal de bienvenida
});

// Cerrar modal y proceder a mostrar contenido posterior al login
btnLoginExito.addEventListener("click", () => {
  modalLogin.classList.add("hidden");
  document.querySelectorAll("section").forEach(sec => {
    if (!sec.classList.contains("registro-notas")) {
      sec.style.display = "none";
    }
  });
  // Mostrar el menú de navegación
  document.querySelector("nav").style.display = "flex";
  // Mostrar la sección de journaling
  document.querySelector(".registro-notas").style.display = "flex";
  document.querySelector(".registro-notas").scrollIntoView({ behavior: "smooth" });
  // Mostrar entradas guardadas
  mostrarEntradas();
});


// REGISTRO DE NOTAS
// Evento para guardar una entrada
document.getElementById("journalingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("tituloEntrada").value.trim();
  const contenido = document.getElementById("contenidoEntrada").value.trim();
  if (!titulo || !contenido) {
    alert("Por favor, completa todos los campos.");
    return;
  }
  const fecha = new Date();
  const entrada = {
    titulo,
    contenido,
    fecha: fecha.toLocaleString()
  };
  // Obtener entradas anteriores y guardar la nueva
  const entradas = JSON.parse(localStorage.getItem("entradasJournal")) || [];
  entradas.unshift(entrada); // Agregar al inicio
  localStorage.setItem("entradasJournal", JSON.stringify(entradas));
  // Limpiar formulario y recargar lista
  this.reset();
  mostrarEntradas();
});

// Mostrar entradas almacenadas
function mostrarEntradas() {
  const lista = document.getElementById("listaEntradas");
  lista.innerHTML = "";

  const entradas = JSON.parse(localStorage.getItem("entradasJournal")) || [];

  if (entradas.length === 0) {
    lista.innerHTML = "<p>No hay entradas todavía.</p>";
    return;
  }

  entradas.forEach((entrada, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${entrada.titulo}</h3>
      <p>${entrada.contenido}</p>
      <small>${entrada.fecha}</small>
      <br>
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
      <hr>
    `;
    lista.appendChild(li);
  });

  // Asignar evento a cada botón de eliminar
  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      eliminarEntrada(index);
    });
  });
}

function eliminarEntrada(index) {
  let entradas = JSON.parse(localStorage.getItem("entradasJournal")) || [];
  entradas.splice(index, 1); // Elimina la entrada en esa posición
  localStorage.setItem("entradasJournal", JSON.stringify(entradas));
  mostrarEntradas(); // Vuelve a renderizar la lista
}

// Mostrar entradas al cargar
document.addEventListener("DOMContentLoaded", mostrarEntradas);

// Mostrar sección al hacer clic en un enlace de ancla (como Diario Guiado o Contáctanos)
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1); // Quita el '#'
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      e.preventDefault();

      // Mostrar solo la sección destino, ocultar otras
      document.querySelectorAll("section").forEach(sec => {
        sec.style.display = sec.id === targetId ? "block" : "none";
      });

      // Asegurar que el menú esté visible
      document.querySelector("nav").style.display = "flex";

      // Scroll suave a la sección
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});