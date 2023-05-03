const tablaIngredientes = document.getElementById("ingredientTable");
const formulario = document.getElementById("formulario");
let ingredienteJSON = [];
let ingredientes = [];
const recetasElegidas = [];


function crearLista(lista = []) {
  tablaIngredientes.innerHTML = "";
  lista.forEach((ingrediente, index) => {
    const record = document.createElement("tr");
    const id = index + 1;
    record.innerHTML = `
      <td scope="row">${id}</td>
      <td>${ingrediente}</td>
      <td><button class="eliminar ingredients__btneliminar" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button></td>
    `;
    tablaIngredientes.append(record);
  });
  // Agregar evento de clic a cada botón "Eliminar"
const botonesEliminar = document.querySelectorAll(".eliminar");
for (let i = 0; i < botonesEliminar.length; i++) {
  botonesEliminar[i].addEventListener("click", (event) => {
    const index = event.target.getAttribute("data-index");
    ingredientes.splice(index, 1);
    eliminarIngrediente(index);
    crearLista(ingredientes);

  });
}
}

if (localStorage.getItem("ingrediente")) {
  ingredienteJSON = JSON.parse(localStorage.getItem("ingrediente"));
  ingredientes = ingredienteJSON;
  crearLista(ingredientes);
} 


function eliminarIngrediente(index) {
  // Obtener el array de ingredientes almacenado en el Local Storage
  let ingredientesLS = JSON.parse(localStorage.getItem('ingrediente'));
  
  // Eliminar el elemento correspondiente del array
  ingredientesLS.splice(index, 1);

  // Guardar el array actualizado en el Local Storage
  localStorage.setItem('ingrediente', JSON.stringify(ingredientesLS));
}



function buscarIngrediente(ingrediente) {
  return ingredientes.includes(ingrediente);
}

function mostrarReceta() {
  const ingredienteIngresado =
    document.getElementById("nombreIngrediente").value;
    //Almacena en local storage todos los ingredientes ingresados
  if (!ingredienteIngresado) {
    return false;
  }
  if (buscarIngrediente(ingredienteIngresado)) {
    //msj error
    console.log(`El ingrediente "${ingredienteIngresado}" ya fue ingresado.`);
    return false;
  }
  //msj exitoso
  ingredientes.push(ingredienteIngresado);
  //Almacenamos en el local storage todas las carreras.
  localStorage.setItem("ingrediente", JSON.stringify(ingredientes));
  crearLista(ingredientes);
  clearInput();
}

function clearInput() {
  document.getElementById("nombreIngrediente").value = "";
}

//CREAR TABLA DE RECETAS ENCONTRADAS
const tablaRecetasEncontradas = document.getElementById("recipeTable");
const buscar = document.getElementById("buscar");

function crearListaRecetas(lista = []) {
  tablaRecetasEncontradas.innerHTML = "";
  lista.forEach((receta, index) => {
    const record = document.createElement("tr");
    const id = index + 1;
    record.innerHTML = `
      <td scope="row">${id}</td>
      <td>${receta}</td>
      <td><button class="verMas ingredients__btnVerMas" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button></td>
    `;
    tablaRecetasEncontradas.append(record);
  });
}

function buscarReceta() {
  let find = false;
  for (let i = 0; i < ingredientes.length; i++) {
    for (let j = 0; j < recetas.length; j++) {
      find = recetas[j].ingredientes.includes(ingredientes[i]);
      let recetasElegidasRepetidas = recetasElegidas.find(
        (unaReceta) => unaReceta == recetas[j].nombre
      );
      if (find && !recetasElegidasRepetidas) {
        recetasElegidas.push(recetas[j].nombre);
      } else {
        break;
      }      
    }
  }
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  mostrarReceta();
});

buscar.addEventListener("click", (event) => {
  buscarReceta();
  if (recetasElegidas.length > 0) {
    crearListaRecetas(recetasElegidas);
  }
});
