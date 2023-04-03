
let ingredientes = new Array();
let contador = 0;

function pedirNombre() {
    let nombreIngresado = prompt("Hola, ¿Cómo te llamas?");
    alert("Así que eres " + nombreIngresado);
}
pedirNombre();

while (true){
    let ingrediente = prompt("¿Qué ingredientes disponés para cocinar?");
        if(ingrediente==""|| ingrediente == null|| ingrediente==undefined || ingrediente==" ") {
            alert("El ingrediente ingresado no es correcto. Por favor ingresa nuevamente el ingrediente")
        } else{
            ingredientes.push(ingrediente.toLowerCase());
            let agregar = prompt("¿Quieres agregar otro ingrediente?").toLowerCase();
            contador ++;
            if(agregar == "si"){
                alert("Perfecto, continuamos!")
            } else {
                alert("¡Genial, terminamos!")
                break;
            }
        }
}

alert("ingredientes ingresados: " + ingredientes);

