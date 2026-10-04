const PASSWORD = "danza2026";


/* LOGIN */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const password =
            document.getElementById("password").value;


        if (password === PASSWORD) {

            sessionStorage.setItem(
                "adminClubDanza",
                "true"
            );

            mostrarAdmin();

        } else {

            document.getElementById("loginError")
                .textContent =
                "Contraseña incorrecta.";

        }

    });


function mostrarAdmin() {

    document
        .getElementById("login")
        .classList.add("hidden");

    document
        .getElementById("adminPanel")
        .classList.remove("hidden");


    cargarContenido();

    cargarHorarios();

    cargarInscritos();

}


if (
    sessionStorage.getItem("adminClubDanza")
    === "true"
) {

    mostrarAdmin();

}


/* CERRAR SESION */

function cerrarSesion() {

    sessionStorage.removeItem(
        "adminClubDanza"
    );

    location.reload();

}


/* CAMBIAR SECCION */

function mostrarSeccion(seccion) {

    document
        .getElementById("contenido")
        .classList.add("hidden");

    document
        .getElementById("horarios")
        .classList.add("hidden");

    document
        .getElementById("inscritos")
        .classList.add("hidden");


    document
        .getElementById(seccion)
        .classList.remove("hidden");

}


/* DATOS */

const datosIniciales = {

    siteName: "Club de Danza",

    heroTitle:
        "Baila, aprende y vive la música",

    heroText:
        "Un espacio para desarrollar tu talento, mejorar tu técnica y disfrutar la danza.",

    aboutText:
        "Somos un club dedicado a la formación artística y al desarrollo integral mediante la danza.",

    missionText:
        "Formar bailarines con disciplina, creatividad y confianza, promoviendo el bienestar, la expresión artística y el trabajo en equipo.",

    visionText:
        "Ser un club de danza reconocido por su calidad formativa, ambiente inclusivo y participación destacada en eventos culturales.",

    valuesText:
        "Respeto, responsabilidad, disciplina, compañerismo, creatividad, inclusión y pasión por el arte.",

    contactPhone:
        "099 000 0000",

    contactEmail:
        "clubdedanza@email.com",

    contactAddress:
        "Centro de la ciudad, Ecuador",

    contactHours:
        "Lunes a sábado, 09:00 a 20:00",

    schedule: [

        {
            dance: "Urbano",
            days: "Lunes y miércoles",
            time: "17:00 - 18:30",
            level: "Principiante"
        },

        {
            dance: "Ritmos Latinos",
            days: "Martes y jueves",
            time: "18:00 - 19:30",
            level: "Todos"
        }

    ]

};


function obtenerDatos() {

    const guardados =
        localStorage.getItem(
            "clubDanzaDatos"
        );

    if (guardados) {

        return {
            ...datosIniciales,
            ...JSON.parse(guardados)
        };

    }

    return datosIniciales;

}


/* CARGAR CONTENIDO */

function cargarContenido() {

    const d = obtenerDatos();


    document.getElementById("aSiteName")
        .value = d.siteName;

    document.getElementById("aHeroTitle")
        .value = d.heroTitle;

    document.getElementById("aHeroText")
        .value = d.heroText;

    document.getElementById("aAboutText")
        .value = d.aboutText;

    document.getElementById("aMissionText")
        .value = d.missionText;

    document.getElementById("aVisionText")
        .value = d.visionText;

    document.getElementById("aValuesText")
        .value = d.valuesText;

    document.getElementById("aPhone")
        .value = d.contactPhone;

    document.getElementById("aEmail")
        .value = d.contactEmail;

    document.getElementById("aAddress")
        .value = d.contactAddress;

    document.getElementById("aHours")
        .value = d.contactHours;

}


/* GUARDAR CONTENIDO */

function guardarContenido() {

    const d = obtenerDatos();


    d.siteName =
        document.getElementById("aSiteName").value;

    d.heroTitle =
        document.getElementById("aHeroTitle").value;

    d.heroText =
        document.getElementById("aHeroText").value;

    d.aboutText =
        document.getElementById("aAboutText").value;

    d.missionText =
        document.getElementById("aMissionText").value;

    d.visionText =
        document.getElementById("aVisionText").value;

    d.valuesText =
        document.getElementById("aValuesText").value;

    d.contactPhone =
        document.getElementById("aPhone").value;

    d.contactEmail =
        document.getElementById("aEmail").value;

    d.contactAddress =
        document.getElementById("aAddress").value;

    d.contactHours =
        document.getElementById("aHours").value;


    localStorage.setItem(
        "clubDanzaDatos",
        JSON.stringify(d)
    );


    document.getElementById("saveMessage")
        .textContent =
        "✓ Cambios guardados correctamente.";

}


/* HORARIOS */

function cargarHorarios() {

    const d = obtenerDatos();

    const contenedor =
        document.getElementById(
            "listaHorarios"
        );


    contenedor.innerHTML = "";


    d.schedule.forEach((h, index) => {

        const div =
            document.createElement("div");

        div.className =
            "horario-item";


        div.innerHTML = `

            <input
                value="${h.dance}"
                data-index="${index}"
                data-field="dance">

            <input
                value="${h.days}"
                data-index="${index}"
                data-field="days">

            <input
                value="${h.time}"
                data-index="${index}"
                data-field="time">

            <input
                value="${h.level}"
                data-index="${index}"
                data-field="level">

            <button
                class="delete"
                onclick="eliminarHorario(${index})">
                X
            </button>

        `;


        contenedor.appendChild(div);

    });

}


/* AGREGAR HORARIO */

function agregarHorario() {

    const d = obtenerDatos();


    d.schedule.push({

        dance: "Nueva clase",

        days: "Día",

        time: "00:00 - 00:00",

        level: "Todos"

    });


    localStorage.setItem(
        "clubDanzaDatos",
        JSON.stringify(d)
    );


    cargarHorarios();

}


/* ELIMINAR HORARIO */

function eliminarHorario(index) {

    const d = obtenerDatos();


    d.schedule.splice(index, 1);


    localStorage.setItem(
        "clubDanzaDatos",
        JSON.stringify(d)
    );


    cargarHorarios();

}


/* GUARDAR HORARIOS */

function guardarHorarios() {

    const d = obtenerDatos();


    const elementos =
        document.querySelectorAll(
            ".horario-item"
        );


    d.schedule = [];


    elementos.forEach(item => {

        d.schedule.push({

            dance:
                item.querySelector(
                    '[data-field="dance"]'
                ).value,

            days:
                item.querySelector(
                    '[data-field="days"]'
                ).value,

            time:
                item.querySelector(
                    '[data-field="time"]'
                ).value,

            level:
                item.querySelector(
                    '[data-field="level"]'
                ).value

        });

    });


    localStorage.setItem(
        "clubDanzaDatos",
        JSON.stringify(d)
    );


    alert(
        "Horarios guardados correctamente."
    );

}


/* INSCRITOS */

function cargarInscritos() {

    const inscritos =
        JSON.parse(
            localStorage.getItem(
                "inscritosClubDanza"
            ) || "[]"
        );


    const tabla =
        document.getElementById(
            "listaInscritos"
        );


    tabla.innerHTML = "";


    if (inscritos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7">
                    No existen inscripciones.
                </td>
            </tr>
        `;

        return;

    }


    inscritos.forEach(persona => {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>${persona.nombre}</td>

            <td>${persona.edad}</td>

            <td>${persona.telefono}</td>

            <td>${persona.correo}</td>

            <td>${persona.danza}</td>

            <td>${persona.nivel}</td>

            <td>

                <button
                    class="delete"
                    onclick="
                    eliminarInscrito(${persona.id})
                    ">

                    Eliminar

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


/* ELIMINAR INSCRITO */

function eliminarInscrito(id) {

    let inscritos =
        JSON.parse(
            localStorage.getItem(
                "inscritosClubDanza"
            ) || "[]"
        );


    inscritos =
        inscritos.filter(
            persona =>
                persona.id !== id
        );


    localStorage.setItem(
        "inscritosClubDanza",
        JSON.stringify(inscritos)
    );


    cargarInscritos();

}


/* EXPORTAR CSV */

function exportarCSV() {

    const inscritos =
        JSON.parse(
            localStorage.getItem(
                "inscritosClubDanza"
            ) || "[]"
        );


    if (inscritos.length === 0) {

        alert(
            "No existen inscritos."
        );

        return;

    }


    let csv =
        "Nombre,Edad,Telefono,Correo,Danza,Nivel,Fecha\n";


    inscritos.forEach(p => {

        csv +=
            `"${p.nombre}","${p.edad}","${p.telefono}","${p.correo}","${p.danza}","${p.nivel}","${p.fecha}"\n`;

    });


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const enlace =
        document.createElement("a");


    enlace.href = url;

    enlace.download =
        "inscritos_club_danza.csv";


    enlace.click();


    URL.revokeObjectURL(url);

}