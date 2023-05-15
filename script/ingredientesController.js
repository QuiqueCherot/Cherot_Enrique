const tablaIngredientes = document.getElementById("ingredientTable");
const formulario = document.getElementById("formulario");
let ingredienteJSON = [];
let ingredientes = [];
const recetasElegidas = [];
const tablaRecetasEncontradas = document.getElementById("recipeTable");
const buscar = document.getElementById("buscar");

function renderizarIngredientes(lista = []) {
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
      renderizarIngredientes(ingredientes);
    });
  }
}

if (localStorage.getItem("ingrediente")) {
  ingredienteJSON = JSON.parse(localStorage.getItem("ingrediente"));
  ingredientes = ingredienteJSON;
  renderizarIngredientes(ingredientes);
}

function eliminarIngrediente(index) {
  // Obtener el array de ingredientes almacenado en el Local Storage
  let ingredientesLS = JSON.parse(localStorage.getItem("ingrediente"));

  // Eliminar el elemento correspondiente del array
  ingredientesLS.splice(index, 1);

  // Guardar el array actualizado en el Local Storage
  localStorage.setItem("ingrediente", JSON.stringify(ingredientesLS));
}

function buscarIngrediente(ingrediente) {
  return ingredientes.includes(ingrediente);
}

function mostrarReceta() {
  const ingredienteIngresado = document
    .getElementById("nombreIngrediente")
    .value.trim();
  if (!ingredienteIngresado) {
    return false;
  }
  if (buscarIngrediente(ingredienteIngresado)) {
    msjErroneo();
  } else {
    msjSuccess();
    ingredientes.push(ingredienteIngresado);
    //Almacenamos en el local storage todas las carreras.
    localStorage.setItem("ingrediente", JSON.stringify(ingredientes));
    renderizarIngredientes(ingredientes);
    clearInput();
  }
}

function clearInput() {
  document.getElementById("nombreIngrediente").value = "";
}

//CREAR TABLA DE RECETAS ENCONTRADAS

function crearListaRecetas(data) {
  tablaRecetasEncontradas.innerHTML = "";
  if (data.meals !== null) {
    data.meals.forEach((meal, index) => {
      const record = document.createElement("tr");
      const id = index + 1;
      record.innerHTML = `
        <td scope="row">${id}</td>
        <td>${meal.strMeal}</td>
        <td>${meal.idMeal}</td>
        <td><button class="ingredients__btneliminar ingredients__btnVerMas" data-index="${index}"><i class="fa-solid fa-plus"></i></button></td>
      `;
      tablaRecetasEncontradas.append(record);
      // Agregar evento de clic a cada botón "verMas"
      const botonVerMas = document.querySelectorAll(".ingredients__btnVerMas");
      for (let i = 0; i < botonVerMas.length; i++) {
        botonVerMas[i].addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");
          const receta = data.meals[index].strMeal;
          console.log(receta);
          console.log(index);
          verReceta(receta);
        });
      }
    });
  }
}

function verReceta(receta) {
  Swal.fire({
    title: receta,
    html: `
      <h4>Ingredientes</h4>
      <p>${receta}</p>
      `,
    /*
        <h4>Ingredientes:</h4>
        <ul>
          ${receta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
        </ul>
        <h4>Pasos:</h4>
        <ol>
          ${receta.pasos.map(paso => `<li>${paso}</li>`).join('')}
        </ol>*/
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

// Buscamos receta recorriendo el array ingredientes y comparando reemplazando en el llamado a la API.
function buscarReceta() {
  for (let i = 0; i < ingredientes.length; i++) {
    let ingrediente = ingredientes[i];
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
      .then((response) => response.json())
      .then((data) => {
        crearListaRecetas(data);
      });
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
