// Obtener elementos del DOM
const tablaIngredientes = document.getElementById("ingredientTable");
const formulario = document.getElementById("formulario");
const tablaRecetasEncontradas = document.getElementById("recipeTable");
const buscar = document.getElementById("buscar");
const listaReceta = document.getElementById("comida");
const verMasBtns = document.querySelectorAll(".verMas");

// Variables de datos
let ingredienteJSON = [];
let ingredientes = [];
const recetasElegidas = [];
let urlInstrucciones = "";
const recipesId = [];
let recetasEncontradas = [];

// Función para renderizar la lista de ingredientes en la tabla
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
// Obtener los ingredientes almacenados en el Local Storage al cargar la página
if (localStorage.getItem("ingrediente")) {
  ingredienteJSON = JSON.parse(localStorage.getItem("ingrediente"));
  ingredientes = ingredienteJSON;
  renderizarIngredientes(ingredientes);
}
// Eliminar un ingrediente del Local Storage y actualizar la tabla de ingredientes
function eliminarIngrediente(index) {
  let ingredientesLS = JSON.parse(localStorage.getItem("ingrediente"));
  ingredientesLS.splice(index, 1);
  localStorage.setItem("ingrediente", JSON.stringify(ingredientesLS));
}
//Buscar si un ingrediente ya está en la lista
function buscarIngrediente(ingrediente) {
  return ingredientes.includes(ingrediente);
}

function mostrarIngredientes() {
  const ingredienteIngresado = document
    .getElementById("nombreIngrediente")
    .value.trim()
    .toLowerCase();
    console.log(ingredienteIngresado);
  if (!ingredienteIngresado) {
    return false;
  }
  if (buscarIngrediente(ingredienteIngresado)) {
    msjErroneo();
  } else {
    msjSuccess();
    ingredientes.push(ingredienteIngresado);
    //Almacenamos en el local storage todas los ingredientes.
    localStorage.setItem("ingrediente", JSON.stringify(ingredientes));
    renderizarIngredientes(ingredientes);
    clearInput();
  }
}

function clearInput() {
  document.getElementById("nombreIngrediente").value = "";
}

function clearRecetasEncontradas() {
  recetasEncontradas = [];
}

function buscarReceta() {
  const fetchPromises = ingredientes.map((ingrediente) => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
      .then((response) => response.json())
      .then((data) => {
        data.meals.forEach((meal) => {
          recipesId.push(meal.idMeal);
        });
      });
  });

  Promise.all(fetchPromises).then(() => {
    comparandoIngredientes();
    mostrarRecetas(recetasEncontradas); // Mover aquí la llamada a mostrarRecetas()
  });

  function comparandoIngredientes() {
    recipesId.forEach((id) => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          const receta = data.meals[0];
          let ingredienteLista = [];

          for (let i = 1; i <= 20; i++) {
            const ingrediente = receta[`strIngredient${i}`];
            if (ingrediente) {
              ingredienteLista.push(ingrediente);
            }
          }

          if (ingredienteLista.length > 0) {
            const todosPresentes = ingredientes.every((ingrediente) =>
              ingredienteLista.includes(ingrediente)
            );

            if (todosPresentes) {
              const recetaExistente = recetasEncontradas.find(
                (recetaEncontrada) => recetaEncontrada.idMeal === receta.idMeal
              );

              if (!recetaExistente) {
                recetasEncontradas.push(receta);
              }
            }
          }
        });
    });
  }
}


function mostrarRecetas(meals) {
  console.log(meals);
  let html = "";
  meals.forEach((meal) => {
    const idMeal = meal.idMeal;
    const strMeal = meal.strMeal;
    const strMealThumb = meal.strMealThumb;

    html += `
      <div class="card d-inline-block ingredients__card" data-id="${idMeal}" style="width: 18rem;">
        <img src="${strMealThumb}" class="card-img-top" alt="comida">
        <div class="card-body">
          <h5 class="card-title">${strMeal}</h5>
          <a href="#" class="btn btn-primary verMas" data-id="${idMeal}">Go somewhere</a>
        </div>
      </div>
    `;
  });

  listaReceta.innerHTML = html;
}

//Obtenemos URl de la API como parámetro para redirigir al usuario.
function videoInstrucciones(urlInstrucciones) {
  window.location.href = urlInstrucciones;
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  mostrarIngredientes();
});

buscar.addEventListener("click", () => {
  //clearRecetasEncontradas(); con esto no salen las cards.
  buscarReceta();
});

listaReceta.addEventListener("click", (event) => {
  if (event.target.classList.contains("verMas")) {
    const id = event.target.getAttribute("data-id");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const receta = data.meals[0]; // Acceder a la receta individual usando [0]
        const instrucciones = receta.strInstructions;
        const nombreReceta = receta.strMeal;
        const imgReceta = receta.strMealThumb;
        urlInstrucciones = receta.strYoutube;
        let ingredienteLista = [];
        for (let i = 1; i <= 20; i++) {
          const ingrediente = receta[`strIngredient${i}`];
          if (ingrediente) {
            ingredienteLista.push(ingrediente);
          }
          if (ingredienteLista.length > 0) {
            const ingredientesHTML = `<ol class="random__ingredients">${ingredienteLista
              .map((ingrediente) => `<li>${ingrediente}</li>`)
              .join(``)}</ol>`;
            Swal.fire({
              imageUrl: imgReceta,
              imageHeight: 500,
              imageAlt: "Nombre Receta",
              title: nombreReceta,
              html: `
                  <div>
                    <h3>Ingredientes:</h3>
                    <p>${ingredientesHTML}\n</p>                   
                    <button class="btn btn-primary ingredients__urlBtn" onclick="videoInstrucciones(urlInstrucciones)"><i class="fas fa-tv"></i> Ver Paso a Paso</button>
                  </div>`,
              showConfirmButton: false,
              showCloseButton: true,
              icon: "success",
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
});

