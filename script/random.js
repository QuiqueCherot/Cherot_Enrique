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
            imageUrl: receta.strMealThumb,
            imageHeight: 500,
            imageAlt: "Nombre Receta",
            title: receta.strMeal,
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
    });
});
