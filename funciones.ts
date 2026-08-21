const oscuroclaro = document.getElementById("modoco");

if (oscuroclaro != null)
{
    oscuroclaro.addEventListener("click", () => {

        document.body.classList.toggle("modo-claro");

        if (document.body.classList.contains("modo-claro"))
        {
            oscuroclaro.textContent = "Modo Oscuro";
        }
        else
        {
            oscuroclaro.textContent = "Modo Claro";
        }

    });
}

const intro = document.getElementById("intro");
const entranding = document.getElementById("entranding");


if(entranding != null && intro != null)
{
    entranding.addEventListener("click",() => {
        
        intro.classList.add("salir"); 
    
    });

}