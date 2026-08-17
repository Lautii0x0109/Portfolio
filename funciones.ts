const oscuroclaro = document.getElementById("modoco");

oscuroclaro?.addEventListener("click",()=>{

    document.body.classList.toggle("modo-claro");

    if(document.body.classList.contains("modo-claro"))
    {
        oscuroclaro.textContent = "Modo Oscuro";
    }
    else
    {
        oscuroclaro.textContent = "Modo Claro";
    }

});
