/*function pintarTabla(collection = []) {
    // Pintar la tabla de carreras en la UI
    let bodyTable = document.getElementById("tableBody");
    bodyTable.innerHTML = "";
    collection.forEach((element) => {
      let record = document.createElement("tr");
      record.innerHTML = `<tr>
        <td scope="row">${element.id}</td>
        <td>${element.toString()}</td>
        <td>${element.catedras.length.toString()}</td>
      </tr>`;
      bodyTable.append(record);
    });
  }*/

function validarIngrediente(ingredienteIngresado) {
  if (
    ingredienteIngresado == "" ||
    ingredienteIngresado == null ||
    ingredienteIngresado == undefined ||
    ingredienteIngresado == " "
  ) {
    return true;
  }
}
function Ingrediente(nombre) {
  this.nombre = nombre;
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
  console.log(ingredienteIngresado);
  let unIngrediente = buscarIngrediente(ingredienteIngresado);
  let ingredienteValidado = validarIngrediente(ingredienteIngresado);
  if (!unIngrediente && !ingredienteValidado) {
    unaReceta = new Ingrediente(ingredienteIngresado);
    // Añadir el ingrediente ingresado por el usuario a la lista de ingredientes
    ingredientes.push(unaReceta);
    
  } else {
    
    console.log(
      "EL INGREDIENTE CON EL NOMBRE (" +
        nombreIngediente() +
        ") YA FUE INGRESADO."
    );
    return false;
  }

  return true;
}

// Función para limpiar el input
function clearInput() {
  document.getElementById("nombre").value = "";
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  let resultado = mostrarReceta();
  console.log(ingredientes);
  if(resultado){
    console.log("Se hizo todo perfecto y ojalá sea este el mensaje, sino a llorar")
  }
  return resultado;
});

