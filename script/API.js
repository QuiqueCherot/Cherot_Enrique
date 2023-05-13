const btnPrueba = document.getElementById('btn-get-recipe')
btnPrueba.addEventListener('click', ()=> {
    // Aquí se agrega el código que llama a la función para obtener la receta
    fetch('https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=1c4af850&app_key=adb87cc09e34579668a7b2b84fcfd328')
    .then(response => {
        // Procesar respuesta
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud HTTP');
        }
    })
    .then(data => {
        console.log(data.hits);
    })
    .catch(error => {
        console.error(error);
    });
  });


  /*const btnPrueba = document.getElementById('btn-get-recipe')
btnPrueba.addEventListener('click', ()=> {
    // Aquí se agrega el código que llama a la función para obtener la receta
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
    .then((response) => response.json())
    .then((data)=>
    console.log(data))
    .catch(error => {
        console.error(error);
    });
  });*/
