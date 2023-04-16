/*OBJETOS DE RECETAS

/* Analizando la posibilidad de que el usuario ingrese su receta favorita y suplimos la func Recetas
por la de abajo
 function Receta (id, nombre, dificultad, tiempoDePreparacion) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = [];
    this.dificultad = dificultad;
    this.tiempoDePreparacion =  tiempoDePreparacion;   

    this.agregarIngredientes = (ingrediente)=> this.ingredientes.push(ingrediente);
}; */

/*Este objeto reemplaza temporalmente el consumo de una API de recetas*/
function Receta(id, nombre, ingredientes, dificultad, tiempoDePreparacion) {
  this.id = id;
  this.nombre = nombre;
  this.ingredientes = ingredientes;
  this.dificultad = dificultad;
  this.tiempoDePreparacion = tiempoDePreparacion;
}

let receta1 = new Receta(
  1,
  "Pollo al disco",
  ["pollo", "papas", "zanahoria"],
  "baja",
  "20 min"
);
let receta2 = new Receta(
  2,
  "Estofado de Pollo",
  ["pollo", "papa", "zanahoria", "salsa de tomate"],
  "baja",
  "30 min"
);
let receta3 = new Receta(
  3,
  "Milanesa con pure de papa",
  ["milanesa", "papa"],
  "baja",
  "30 min"
);
let receta4 = new Receta(
  4,
  "Milanesa con pure de zapallo",
  ["milanesa", "zapallo"],
  "baja",
  "30 min"
);
let receta5 = new Receta(
  5,
  "Matambre de Cerdo con Papas Noicette",
  ["matambre de cerdo", "papas noicette"],
  "media",
  "45 min"
);
let receta6 = new Receta(
  6,
  "Lasagna",
  ["carne picada", "salsa de tomate", "pasta de lasagna"],
  "alta",
  "120 min"
);
let receta7 = new Receta(
  7,
  "Bondiola rellena",
  ["bondiola", "cebollita de verdeo", "queso mouzzarella"],
  "alta",
  "90 min"
);
let receta8 = new Receta(
  8,
  "Tarta tricolor",
  ["masa de tarta", "zapallo", "queso fresco", "zapallito"],
  "baja",
  "45 min"
);
let receta9 = new Receta(
  9,
  "Fideos con salsa bolognesa",
  ["carne picada", "fideos", "salsa de tomate"],
  "media",
  "20 min"
);

let recetas = [
  receta1,
  receta2,
  receta3,
  receta4,
  receta5,
  receta6,
  receta7,
  receta8,
  receta9,
];

/* Función para pre entrega - no tiene funcionalidad en la aplicación web,*/
function pedirNombre() {
  let nombreIngresado = prompt("Hola, ¿Cómo te llamas?");
  alert("Así que eres " + nombreIngresado);
}
pedirNombre();
/*Función Random para generar una receta aleatorea - crea un número aleatoreo que se compara con los id de las recetas*/
function recetaRandom() {
  let numeroRandom = Math.round(Math.random() * (recetas.length - 1) + 1);
  //console de control número random.
  console.log(numeroRandom);
  for (let i = 0; i < recetas.length; i++) {
    if (recetas[i].id == numeroRandom) {
      alert("La receta elegida es: " + recetas[i].nombre);
    }
  }
}
let ingredientes = new Array();
let contador = 1;
let eleccionInicial = prompt(
  "Ingresa tu opción: Ingredientes / Random");
if (eleccionInicial.toLowerCase() == "random") {
  recetaRandom();
} else {
    let cantidad = parseInt(prompt("¿Cuántos ingredientes vas a ingresar?"));
    
    while (contador <= cantidad) {
      let ingrediente = prompt("Ingrese el ingrediente número ".concat(contador));
    
      if (ingredientes.includes(ingrediente.toLowerCase())) {
        alert("Ese ingrediente ya fue ingresado");
      } else if (
        ingrediente == "" ||
        ingrediente == null ||
        ingrediente == undefined ||
        ingrediente == " "
      ) {
        alert(
          "El ingrediente ingresado no es correcto. Por favor ingresa nuevamente el ingrediente"
        );
      } else {
        ingredientes.push(ingrediente.toLowerCase());
        contador++;
      }
    }
    //ingredietnesIngresados sirve únicamente para cumplir con la preEntrega. No tiene funcionalidad aparte.
    let ingredientesIngresados = ingredientes.join(", ");
    
    alert("ingredientes ingresados: " + ingredientesIngresados);
    console.log(ingredientes);
}

/*CREAMOS COMPARADOR DE ARRAYS*/

let find = false;
let recetasElegidas = [];
for (let i = 0; i < ingredientes.length; i++) {
  for (let j = 0; j < recetas.length; j++) {
    find = recetas[j].ingredientes.includes(ingredientes[i]);
    console.log(ingredientes[i] + find + recetas[j].ingredientes);
    if (find) {
      recetasElegidas.push(recetas[j].nombre);
    }
  }
  //creamos recetasParaMostrar sólo a fines de mostrar el Alert para la preEntrega2
  let recetasParaMostrar = recetasElegidas.join(", ");
  if (!recetasElegidas.length) {
    alert("No tenemos una receta para tus ingredientes.");
  } else {
    alert("Con tus ingredientes, podes cocinar: " + recetasParaMostrar);
  }
}

//Nos falta un control para evitar que se repitan ingredientes y que se separen las recetas en distintos alerts.