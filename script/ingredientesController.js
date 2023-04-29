const tablaIngredientes = document.getElementById("ingredientTable");
const formulario = document.getElementById("formulario");
const ingredientes = [];
const recetasElegidas = [];

function pintarTabla(collection = []) {
  tablaIngredientes.innerHTML = "";
  collection.forEach((ingrediente, index) => {
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
      pintarTabla(ingredientes);
    });
  }
}

function buscarIngrediente(ingrediente) {
  return ingredientes.includes(ingrediente);
}

function mostrarReceta() {
  const ingredienteIngresado =
    document.getElementById("nombreIngrediente").value;
  if (!ingredienteIngresado) {
    return false;
  }
  if (buscarIngrediente(ingredienteIngresado)) {
    console.log(`El ingrediente "${ingredienteIngresado}" ya fue ingresado.`);
    return false;
  }
  ingredientes.push(ingredienteIngresado);
  pintarTabla(ingredientes);
  clearInput();
}

function clearInput() {
  document.getElementById("nombreIngrediente").value = "";
}

const buscar = document.getElementById("buscar");

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
        console.log(recetasElegidas);
      }
    }
  }
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  mostrarReceta();
});

buscar.addEventListener("click",(event) => {
  buscarReceta();
  if(!recetasElegidas){
    console.log(recetasElegidas);
  }
})