
let ingredientes = new Array();
let contador = 0;

while (true){
    let ingrediente = prompt("¿Qué ingredientes disponés para cocinar?");
    ingredientes.push(ingrediente);
    let agregar = prompt("¿Quieres agregar otro ingrediente?");
    contador ++;
    if(agregar == "si"){
        alert("Perfecto, continuamos!")
    } else {
        break;
    }

}

for (let i = 0; i < contador; i++){
    console.log("ingredientes: " + ingredientes)
}

//La idea es comparar el array ingredientes con el array de ingredientes de recetas para que traiga la receta que puede hacer
//siempre que cumpla x % de ingredientes.

