const datos = [
    { fecha: "2025-03-17", maestro: "Juan Pérez", estado: "green", clase: "Matemáticas", hora: "8:00" },
    { fecha: "2025-03-18", maestro: "Juan Pérez", estado: "red", clase: "Física", hora: "10:00" },
    { fecha: "2025-03-19", maestro: "Juan Pérez", estado: "yellow", clase: "Química", hora: "9:00" }
];

let offset = 0;

// INICIO
window.onload = () => {
    document.getElementById("fecha").valueAsDate = new Date();
    cargarDatos();
};

function cargarDatos() {
    const fechaInput = document.getElementById("fecha").value;
    const periodo = document.getElementById("periodo").value;
    const maestro = document.getElementById("maestro").value;

    const calendario = document.getElementById("calendar");
    calendario.innerHTML = "";

    let dias = 1;
    if (periodo === "semana") dias = 5; // lunes a viernes
    if (periodo === "quincena") dias = 15;
    if (periodo === "mes") dias = 30;

    let fechaBase = new Date(fechaInput);
    fechaBase.setDate(fechaBase.getDate() + offset);

    for (let i = 0; i < dias; i++) {
        let fechaActual = new Date(fechaBase);
        fechaActual.setDate(fechaBase.getDate() + i);

        let diaSemana = fechaActual.getDay();

        // SOLO lunes a viernes
        if (periodo === "semana" && (diaSemana === 0 || diaSemana === 6)) {
            continue;
        }

        let fechaStr = fechaActual.toISOString().split("T")[0];

        let div = document.createElement("div");
        div.className = "day";
        div.innerHTML = fechaStr;

        datos.forEach(d => {
            if (d.fecha === fechaStr && (maestro === "" || d.maestro === maestro)) {
                div.classList.add(d.estado);

                div.innerHTML += `
                    <div class="evento">
                        ${d.clase}<br>
                        ${d.hora}
                    </div>
                `;
            }
        });

        calendario.appendChild(div);
    }
}

// BOTONES
function siguiente() {
    offset += 5;
    cargarDatos();
}

function anterior() {
    offset -= 5;
    cargarDatos();
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que se envíe automáticamente

    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();

    if (usuario === "" || password === "") {
        alert("Por favor llena todos los campos");
        return;
    }

    // Si todo está bien, redirige
    window.location.href = "dashboard.html";
});

// ABRIR MODAL
function abrirModal() {
    document.getElementById("modalRegistro").style.display = "flex";
}

// CERRAR MODAL
function cerrarModal() {
    document.getElementById("modalRegistro").style.display = "none";
}

// REGISTRAR USUARIO
function registrarUsuario() {
    let usuario = document.getElementById("nuevoUsuario").value.trim();
    let password = document.getElementById("nuevoPassword").value.trim();

    if (usuario === "" || password === "") {
        alert("Llena todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        alert("Ese usuario ya existe");
        return;
    }

    usuarios.push({ usuario, password });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada correctamente");

    cerrarModal(); // cerrar modal
}