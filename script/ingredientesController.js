const tablaIngredientes = document.getElementById("ingredientTable");
const formulario = document.getElementById("formulario");
let ingredienteJSON = [];
let ingredientes = [];
const recetasElegidas = [];
const tablaRecetasEncontradas = document.getElementById("recipeTable");
const buscar = document.getElementById("buscar");
const listaReceta = document.getElementById("comida");
const verMasBtns = document.querySelectorAll(".verMas");

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

// Buscamos receta recorriendo el array ingredientes y comparando reemplazando en el llamado a la API - adicionamos la creación de cards para cada receta encontrada.
function buscarReceta() {
  for (let i = 0; i < ingredientes.length; i++) {
    let ingrediente = ingredientes[i];
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          mostrarRecetas(data.meals);
          console.log(data.meals);
        } else {
          mostrarError();
        }
      })
      .catch((error) => {
        errorInesperado();
      });
  }
}

function mostrarRecetas(meals) {
  let html = "";
  meals.forEach((meal) => {
    html += `
      <div class="card d-inline-block ingredients__card" data-id="${meal.idMeal}" style="width: 18rem;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="comida">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <a href="#" class="btn btn-primary verMas" data-id = "${meal.idMeal}">Go somewhere</a>
        </div>
      </div>
    `;
  });
  listaReceta.innerHTML = html;
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
/*por acá está el tema de ver todas las recetas, acceder a todos los ids, acceder a todos los ingredientes
fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.meals.strInstructions);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
  
fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.meals.strInstructions);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
*/


  listaReceta.addEventListener("click", (event) => {
    if (event.target.classList.contains("verMas")) {
      const id = event.target.getAttribute("data-id");
      console.log(id);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          const receta = data.meals[0]; // Acceder a la receta individual usando [0]
          const instrucciones= receta.strInstructions;
          const nombreReceta = receta.strMeal;
          const imgReceta = receta.strMealThumb;          
          for (let i = 1; i <= 20; i++) {
            const ingrediente = receta[`strIngredient${i}`];
            if (ingrediente) {
              Swal.fire({
                imageUrl: imgReceta,
                imageHeight: 500,
                imageAlt: nombreReceta,
                title: nombreReceta,
                text: instrucciones,
                icon: "success",
                confirmButtonText: "Cerrar"
              });
            }
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  });
  

