// Variables de distintos tipos
const TITULO_APP = "Generador de Tarjetas de Usuario";
let contadorGenerados = 0;
let mostrarActivosSolo = false;
const nombresBase = ["Ana", "Luis", "María", "Carlos", "Lucía", "Pedro", "Sofía"];
const dominioCorreo = "ejemplo.com";

// Clase Usuario con atributos y métodos
class Usuario {
    constructor(nombre, edad, email, activo = true, hobbies = [], creado = new Date()) {
        this.nombre = String(nombre); // uso de String
        this.edad = Number(edad);6
        this.email = String(email).toLowerCase();
        this.activo = Boolean(activo);
        this.hobbies = Array.isArray(hobbies) ? hobbies : [];
        this.creado = creado instanceof Date ? creado : new Date();
    }
    // Método que retorna una presentación del usuario (usa template string)
    presentar() {
        // Usa condicional para cambiar texto según estado
        const estado = this.activo ? "Activo" : "Inactivo";
        return `${this.nombre} (${this.edad} años) - ${estado} - ${this.email}`;
    }

    // Método que devuelve categoría por edad (usa if / else)
    categoriaEdad() {
        if (this.edad < 18) return "Menor";
        if (this.edad <= 35) return "Joven";
        if (this.edad <= 60) return "Adulto";
        return "Mayor";
    }

    // Cambia el estado activo e devuelve el nuevo estado
    toggleActivo() {
        this.activo = !this.activo;
        return this.activo;
    }
}

// Función que crea un número determinado de usuarios aleatorios
function generarUsuariosAleatorios(cantidad = 3) {
    const usuarios = [];
    for (let i = 0; i < cantidad; i++) {
        // Uso de Math para generar índices y edades
        const nombre = nombresBase[Math.floor(Math.random() * nombresBase.length)];
        const edad = Math.floor(Math.random() * 70) + 10; // entre 10 y 79
        // Generar email concatenando y utilizando String methods
        const email = `${nombre.toLowerCase()}.${Date.now().toString().slice(-4)}@${dominioCorreo}`;
        // Hobbies como array (pueden ser vacíos o con algunos valores)
        const hobbies = Math.random() > 0.5 ? ["leer", "deporte"] : ["cine"];
        // Crea objeto Usuario y añade al array
        usuarios.push(new Usuario(nombre, edad, email, Math.random() > 0.3, hobbies, new Date()));
    }
    return usuarios;
}

// Genera usuarios con valores fijos (ejemplo)
function generarUsuariosFijos() {
    return [
        new Usuario("Clara", 28, "clara@ejemplo.com", true, ["pintura", "yoga"], new Date("1997-01-15")),
        new Usuario("Javier", 42, "javier@ejemplo.com", false, ["ajedrez"], new Date("1983-06-02"))
    ];
}

// Función que crea tarjetas en el DOM a partir de un array de usuarios
function mostrarTarjetas(usuarios) {
    const contenedor = document.getElementById("contenedor-tarjetas");
    // Limpia contenido previo
    contenedor.innerHTML = "";

    // Itera con forEach (uso de bucle)
    usuarios.forEach((usuario, index) => {
        // Crea elementos y modifica propiedades del DOM
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");
        if (usuario.activo) tarjeta.classList.add("activo");
        // innerHTML para insertar texto y etiquetas
        tarjeta.innerHTML = `
        <h2>${usuario.nombre}</h2>
        <p>${usuario.presentar()}</p>
        <p><strong>Categoría:</strong> ${usuario.categoriaEdad()}</p>
        <p><strong>Hobbies:</strong> ${usuario.hobbies.join(", ") || "Ninguno"}</p>
        <p><small>Creado: ${usuario.creado.toLocaleString()}</small></p>
        `;
        
        // Botón para alternar estado (modifica propiedad del objeto y el DOM)
        const btnToggle = document.createElement("button");
        btnToggle.textContent = usuario.activo ? "Desactivar" : "Activar";
        btnToggle.addEventListener("click", () => {
        const nuevoEstado = usuario.toggleActivo();
        btnToggle.textContent = nuevoEstado ? "Desactivar" : "Activar";
        tarjeta.classList.toggle("activo", nuevoEstado);
        // Actualiza la línea de presentación
        const pPresent = tarjeta.querySelector("p");
        if (pPresent) pPresent.textContent = usuario.presentar();
        });

        // Botón para eliminar tarjeta y usuario (modifica DOM)
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
        // Eliminamos el elemento del DOM
        contenedor.removeChild(tarjeta);
        // Incrementa contador de eliminaciones (ejemplo de operador)
        contadorGenerados = Math.max(0, contadorGenerados - 1);
        });

        // Añadir botones a la tarjeta
        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(btnToggle);
        actions.appendChild(btnEliminar);
        tarjeta.appendChild(actions);

        // Añadir tarjeta al contenedor
        contenedor.appendChild(tarjeta);
    });
}

// Evento del botón "Generar usuarios"
document.getElementById("generar-btn").addEventListener("click", () => {
  // Pedimos al usuario cuántas tarjetas quiere generar (usa prompt)
  let input = prompt("¿Cuántos usuarios quieres generar? (número entero)", "4");
  let n = parseInt(input, 10);
  // Validaciones (uso de condicionales)
  if (isNaN(n) || n <= 0) {
    alert("Número inválido, se generarán 3 usuarios por defecto.");
    n = 3;
  }

  // Alternativa: combinar aleatorios y fijos (ejemplo de objetos y arrays)
  const aleatorios = generarUsuariosAleatorios(n);
  const fijos = generarUsuariosFijos();
  // Usamos operadores de array para concatenar
  const todos = [...fijos, ...aleatorios];

  // Incrementamos contador de generados (operador aritmético)
  contadorGenerados += todos.length;

  // Mostrar en DOM usando función definida
  mostrarTarjetas(todos);
});

// Al cargar la página se puede mostrar una muestra inicial
document.addEventListener("DOMContentLoaded", () => {
  // Uso de Date para mostrar en consola la fecha de carga
  console.log("Aplicación cargada en:", new Date().toLocaleString());
  // opcional: mostrar una tarjeta de ejemplo
  mostrarTarjetas(generarUsuariosAleatorios(2));
});