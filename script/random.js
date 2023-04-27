/*Función Random para generar una receta aleatorea - crea un número aleatoreo que se compara con los id de las recetas*/
function recetaRandom() {
    let numeroRandom = Math.round(Math.random() * (recetas.length - 1) + 1);
    for (let i = 0; i < recetas.length; i++) {
      if (recetas[i].id == numeroRandom) {
        alert("La receta elegida es: " + recetas[i].nombre);
        console.log(recetas[i.nombre + numeroRandom]);
      }
    }
  }
  const goRandomBtn = document.getElementById("goRandomBtn");
  goRandomBtn.addEventListener("click", recetaRandom);
  