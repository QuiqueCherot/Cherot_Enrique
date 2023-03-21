
let ingredientes = new Array();

while (true){
    let ingrediente = prompt("¿Qué ingredientes disponés para cocinar?");
    ingredientes.push(ingrediente);
    let agregar = toLowerCase(prompt("¿Quieres agregar otro ingrediente?"));
    if(agregar == "si"){
        alert("Perfecto, continuamos!")
    } else {
        break;
    }

}