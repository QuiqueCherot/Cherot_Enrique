/*Función Random para generar una receta aleatorea - crea un número aleatoreo que se compara con los id de las recetas*/

const goRandomBtn = document.getElementById("goRandomBtn");
let urlInstrucciones;

function videoInstrucciones(urlInstrucciones) {
  window.location.href = urlInstrucciones;
}

goRandomBtn.addEventListener("click", (event) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then((response) => response.json())
  .then((data) => {
    const receta = data.meals[0];
    urlInstrucciones = receta.strYoutube;
    let ingredientes = "";
    for (let i = 1; i <= 20; i++) {
      const ingrediente = receta[`strIngredient${i}`];
      if (ingrediente) {
        ingredientes += `${ingrediente}\n`;
      }
      if (ingrediente) {
        Swal.fire({
          imageUrl: receta.strMealThumb,
          imageHeight: 500,
          imageAlt: "Nombre Receta",
          title: receta.strMeal,
          html: `
              <div>
                <h3>Ingredientes:</h3>
                <p>${ingredientes}\n</p>                   
                <button class="btn btn-primary" onclick="videoInstrucciones(urlInstrucciones)">Haz clic en mí</button>
              </div>`,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      }
  };
})
})


