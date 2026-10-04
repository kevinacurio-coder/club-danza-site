const datosIniciales = {

    siteName: "Club de Danza",

    heroTitle: "Baila, aprende y vive la música",

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
        },

        {
            dance: "Contemporáneo",
            days: "Lunes y viernes",
            time: "19:00 - 20:30",
            level: "Intermedio"
        },

        {
            dance: "Danza Folclórica",
            days: "Sábados",
            time: "10:00 - 12:00",
            level: "Todos"
        }

    ]
};


function obtenerDatos() {

    const datos =
        localStorage.getItem("clubDanzaDatos");

    if (datos) {

        return {
            ...datosIniciales,
            ...JSON.parse(datos)
        };

    }

    return datosIniciales;
}


function cargarPagina() {

    const datos = obtenerDatos();

    document.getElementById("siteName").textContent =
        datos.siteName;

    document.getElementById("footerSiteName").textContent =
        datos.siteName;

    document.getElementById("heroTitle").textContent =
        datos.heroTitle;

    document.getElementById("heroText").textContent =
        datos.heroText;

    document.getElementById("aboutText").textContent =
        datos.aboutText;

    document.getElementById("missionText").textContent =
        datos.missionText;

    document.getElementById("visionText").textContent =
        datos.visionText;

    document.getElementById("valuesText").textContent =
        datos.valuesText;

    document.getElementById("contactPhone").textContent =
        datos.contactPhone;

    document.getElementById("contactEmail").textContent =
        datos.contactEmail;

    document.getElementById("contactAddress").textContent =
        datos.contactAddress;

    document.getElementById("contactHours").textContent =
        datos.contactHours;


    const tabla =
        document.getElementById("scheduleBody");

    tabla.innerHTML = "";

    datos.schedule.forEach(clase => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${clase.dance}</td>
            <td>${clase.days}</td>
            <td>${clase.time}</td>
            <td>${clase.level}</td>
        `;

        tabla.appendChild(fila);

    });

}


function toggleMenu() {

    document
        .getElementById("nav")
        .classList.toggle("active");

}


document
    .getElementById("registrationForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const datos =
            new FormData(this);

        const inscripcion = {

            id: Date.now(),

            nombre: datos.get("name"),

            edad: datos.get("age"),

            telefono: datos.get("phone"),

            correo: datos.get("email"),

            danza: datos.get("dance"),

            nivel: datos.get("level"),

            mensaje: datos.get("message"),

            fecha:
                new Date().toLocaleString("es-EC")

        };


        let inscritos =
            JSON.parse(
                localStorage.getItem("inscritosClubDanza")
                || "[]"
            );


        inscritos.push(inscripcion);


        localStorage.setItem(
            "inscritosClubDanza",
            JSON.stringify(inscritos)
        );


        document.getElementById("formMessage")
            .textContent =
            "¡Inscripción enviada correctamente!";


        this.reset();

    });


document.getElementById("year")
    .textContent =
    new Date().getFullYear();


cargarPagina();