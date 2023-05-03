/*OBJETOS DE RECETAS

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



