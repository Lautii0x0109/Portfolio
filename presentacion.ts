const datos: string[] = [

    "Hace mas de 19 años que hago natacion",

    "Toco la guitarra y el teclado",

    "Me gusta muchisimo el metal",

    "Colecciono vinilos",

    "Me gusta dibujar y pintar",

    "Estudio Ingenieria Informática",

    "Tambien estudie para Piloto Privado de Avion",

    "Doy clases particulares de programacion",

    "Me interesan muchisimo los aviones",

    "Me encanta aprender datos random",

    "Uno de mis objetivos es ser profesor universitario",

    "Me interesa tanto el frontend como el backend"

];


const dato: HTMLElement | null =
    document.getElementById("dato_random");

const boton: HTMLElement | null =
    document.getElementById("nuevo_dato");


function mostrarDato(indice: number): void
{
    if (dato === null)
    {
        return;
    }

    dato.textContent = datos[indice];

    dato.style.opacity = "1";
}


function cambiarDato(): void
{
    let indice: number;

    indice = Math.floor(Math.random() * datos.length);

    if (dato === null)
    {
        return;
    }

    dato.style.opacity = "0";

    setTimeout(mostrarDato, 200, indice);
}


if (boton !== null)
{
    boton.addEventListener("click", cambiarDato);
}

//////////////////////////////////////////////////////////////

function iniciarPagina(): void
{
    const pantalla: HTMLElement | null =
        document.getElementById("pantalla_inicio");

    if (pantalla === null)
    {
        return;
    }

    setTimeout(function()
    {
        pantalla.classList.add("ocultar");

    }, 5000);
}


iniciarPagina();

////////////////////////////////////////////////////

function mostrarTarjetas(): void
{
    const tarjetas: NodeListOf<HTMLElement> =
        document.querySelectorAll(".tarjeta");

    tarjetas.forEach(function(tarjeta)
    {
        const posicion: DOMRect =
            tarjeta.getBoundingClientRect();

        if (posicion.top < window.innerHeight * 0.85)
        {
            tarjeta.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", mostrarTarjetas);

mostrarTarjetas();

////////////////////////////////////////////
interface Cancion
{
    nombre: string;
    artista: string;
    archivo: string;
    portada: string;
}


const canciones: Cancion[] =
[
    {
        nombre: "A_Tout_Le_Monde",
        artista: "Megadeth",
        archivo: "megadeth.mp3",
        portada: "youthanasia.jpg"
    },

    {
        nombre: "In_My_Time_of_Dying",
        artista: "Led Zeppelin",
        archivo: "ledzepp.mp3",
        portada: "led.jpg"
    },

    {
        nombre: "Strange_Kind_of_Woman",
        artista: "Deep Purple",
        archivo: "deep.mp3",
        portada: "dp.jpg"
    },

    {
        nombre: "War_Pigs",
        artista: "Black Sabbath",
        archivo: "black.mp3",
        portada: "ozzy.jpg"
    },

    {
        nombre: "Echoes_(Live_in_Pompeii)",
        artista: "Pink Floyd",
        archivo: "pink.mp3",
        portada: "floyd.jpg"
    }
];


///////////////////////////////////////////////////////////////
const audio =
    document.getElementById("audio") as HTMLAudioElement | null;


const nombreCancion =
    document.getElementById("nombre_cancion");


const nombreArtista =
    document.getElementById("nombre_artista");

const portada =
    document.getElementById("portada") as HTMLImageElement | null;


const botonReproducir =
    document.getElementById("reproducir");


const botonAnterior =
    document.getElementById("anterior");


const botonSiguiente =
    document.getElementById("siguiente");


const progreso =
    document.getElementById("progreso");


const tiempoActual =
    document.getElementById("tiempo_actual");


const tiempoTotal =
    document.getElementById("tiempo_total");


const cancionesLista =
    document.querySelectorAll(".cancion_lista");


let cancionActual: number = 0;

function cargarCancion(indice: number): void
{
    if (audio === null)
    {
        return;
    }

    if (nombreCancion === null)
    {
        return;
    }

    if (nombreArtista === null)
    {
        return;
    }


    cancionActual = indice;


    nombreCancion.textContent =
        canciones[indice].nombre;


    nombreArtista.textContent =
        canciones[indice].artista;


    if (portada !== null)
    {
        portada.src =
            canciones[indice].portada;

        portada.alt =
            "Portada de " +
            canciones[indice].artista;
    }


    audio.src =
        canciones[indice].archivo;


    audio.load();


    actualizarPlaylist();
}

function reproducirCancion(): void
{
    if (audio === null)
    {
        return;
    }


    if (audio.paused)
    {
        audio.play();
    }
    else
    {
        audio.pause();
    }
}
//////////////////////////////////////////////////////
function siguienteCancion(): void
{
    cancionActual++;


    if (cancionActual >= canciones.length)
    {
        cancionActual = 0;
    }


    cargarCancion(cancionActual);


    if (audio !== null)
    {
        audio.play();
    }
}

function anteriorCancion(): void
{
    cancionActual--;


    if (cancionActual < 0)
    {
        cancionActual = canciones.length - 1;
    }


    cargarCancion(cancionActual);


    if (audio !== null)
    {
        audio.play();
    }
}
////////////////////////////////////////////////////////////////
function actualizarPlaylist(): void
{
    cancionesLista.forEach(function(cancion, indice)
    {
        if (indice === cancionActual)
        {
            cancion.classList.add("activa");
        }
        else
        {
            cancion.classList.remove("activa");
        }
    });
}

cancionesLista.forEach(function(cancion)
{
    cancion.addEventListener("click", function()
    {
        const indice =
            Number(cancion.getAttribute("data-cancion"));


        cargarCancion(indice);


        if (audio !== null)
        {
            audio.play();
        }
    });
});
////////////////////////////////////////////////////
function actualizarProgreso(): void
{
    if (audio === null)
    {
        return;
    }

    if (progreso === null)
    {
        return;
    }


    if (audio.duration > 0)
    {
        const porcentaje =
            (audio.currentTime / audio.duration) * 100;


        progreso.style.width =
            porcentaje + "%";
    }
}

if (audio !== null)
{
    audio.addEventListener(
        "timeupdate",
        actualizarProgreso
    );
}
///////////////////////////////////////////////////////
function formatearTiempo(segundos: number): string
{
    const minutos: number =
        Math.floor(segundos / 60);


    const segundosRestantes: number =
        Math.floor(segundos % 60);


    const segundosTexto: string =
        segundosRestantes < 10
            ? "0" + segundosRestantes
            : String(segundosRestantes);


    return minutos + ":" + segundosTexto;
}

if (audio !== null)
{
    audio.addEventListener("timeupdate", function()
    {
        if (tiempoActual !== null)
        {
            tiempoActual.textContent =
                formatearTiempo(audio.currentTime);
        }
    });


    audio.addEventListener("loadedmetadata", function()
    {
        if (tiempoTotal !== null)
        {
            tiempoTotal.textContent =
                formatearTiempo(audio.duration);
        }
    });
}

/////////////////////////////////////////////

if (botonReproducir !== null)
{
    botonReproducir.addEventListener(
        "click",
        reproducirCancion
    );
}


if (botonAnterior !== null)
{
    botonAnterior.addEventListener(
        "click",
        anteriorCancion
    );
}


if (botonSiguiente !== null)
{
    botonSiguiente.addEventListener(
        "click",
        siguienteCancion
    );
}

cargarCancion(0);
////////////////////////////////////////////