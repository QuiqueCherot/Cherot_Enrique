function pintarTabla(collection = []) {
  // Pintar la tabla de carreras en la UI
  let ingredientTable = document.getElementById("ingredientTable");
  ingredientTable.innerHTML = "";
  collection.forEach((element) => {
    let record = document.createElement("tr");
    //<td scope="row">${element.id}</td>
    record.innerHTML = `<tr>      
      <td scope="row">"1"</td>
      <td>${element.toString()}</td>
    </tr>`;
    ingredientTable.append(record);
  });
}
function validarIngrediente(ingredienteIngresado) {
  return ( ingredienteIngresado || false); 
}

function buscarIngrediente(ingredienteIngresado) {
  return ingredientes.find(
    (element) => element === ingredienteIngresado
  );
}

let ingredientes = new Array();
const formulario = document.getElementById("formulario");

function mostrarReceta() {
  const ingredienteIngresado =
    document.getElementById("nombreIngrediente").value;
  // Buscamos y validamos, o creamos una Receta
  let unIngrediente = buscarIngrediente(ingredienteIngresado);
  let ingredienteValidado = validarIngrediente(ingredienteIngresado);
  if (!unIngrediente && ingredienteValidado) {
    // Añadir el ingrediente ingresado por el usuario a la lista de ingredientes
    ingredientes.push(ingredienteIngresado);
    // msj exitoso
    
  } else {
    // msj error
    console.log(
      "EL INGREDIENTE CON EL NOMBRE (" +
        ingredienteIngresado +
        ") YA FUE INGRESADO."
    );
    return false;
  }

  return true;
}

// Función para limpiar el input
function clearInput() {
  document.getElementById("nombreIngrediente").value = "";
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let resultado = mostrarReceta();
  if(resultado){
    pintarTabla(ingredientes);
    clearInput();

  }
  return resultado;
});

  