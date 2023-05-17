const tablaIngredientes = document.getElementById("ingredientTable");
const formulario = document.getElementById("formulario");
let ingredienteJSON = [];
let ingredientes = [];
const recetasElegidas = [];
const tablaRecetasEncontradas = document.getElementById("recipeTable");
const buscar = document.getElementById("buscar");
const listaReceta = document.getElementById('comida');

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



/*function verReceta(receta) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${receta}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      const ingredientes = [];
      const pasos = [];
      for (let i = 1; i <= 20; i++) {
        const ingrediente = meal[`strIngredient${i}`];
        const medida = meal[`strMeasure${i}`];
        if (ingrediente && ingrediente.trim() !== "") {
          ingredientes.push(`${ingrediente} - ${medida}`);
        }
      }
      for (let i = 1; i <= 10; i++) {
        const paso = meal[`strInstructions${i}`];
        if (paso && paso.trim() !== "") {
          pasos.push(paso);
        }
      }
      Swal.fire({
        title: receta,
        html: `
          <h4>Ingredientes:</h4>
          <ul>
            ${ingredientes
              .map((ingrediente) => `<li>${ingrediente}</li>`)
              .join("")}
          </ul>
          <h4>Pasos:</h4>
          <ol>
            ${pasos.map((paso) => `<li>${paso}</li>`).join("")}
          </ol>
        `,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    });
}*/

// Buscamos receta recorriendo el array ingredientes y comparando reemplazando en el llamado a la API - adicionamos la creación de cards para cada receta encontrada.
function buscarReceta() {
  for (let i = 0; i < ingredientes.length; i++) {
    let ingrediente = ingredientes[i];
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        if (data.meals) {
          data.meals.forEach(meal => {
            html += `
              <div class="card d-inline-block ingredients__card" data-id= ${meal.idMeal} style="width: 18rem; ">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="comida">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              `;
          });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No hay recetas con esos ingredientes. Prueba con los principales.',
            })
          }
        listaReceta.innerHTML = html;
      });
      };
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
