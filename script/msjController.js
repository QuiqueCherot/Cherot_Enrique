const msjExitoso = document.getElementById("msj");
function msjSuccess() {
  msjExitoso.classList.add("ingredients__ingresados-success");
  const record = document.createElement("p");
  record.innerHTML = `<p> El ingrediente fue ingresado correctamente</p>`;
  msjExitoso.append(record);
  setTimeout(() => {
    msjExitoso.innerHTML = "";
    msjExitoso.classList.remove("ingredients__ingresados-success");
  }, 2000);
  
}

const msjError = document.getElementById("msj");
function msjErroneo() {
  msjError.classList.add("ingredients__ingresados-error");
  const record = document.createElement("p");
  record.innerHTML = `<p> El ingrediente ya fue ingresado. Intente con otro ingrediente.</p>`;
  msjExitoso.append(record);
  setTimeout(() => {
    msjError.innerHTML = "";
    msjError.classList.remove("ingredients__ingresados-error");
  }, 2000);
  
}

function mostrarError() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No encontramos ninguna receta. Probá ingresando ingredientes principales únicamente.',
  });
}

function errorInesperado() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ha ocurrido un error inesperado. Porfavor intente nuevamente.',
  });
}

function msjErrorMaximoIngredientes() {
  Swal.fire({
    title: "Error",
    text: "Solo puedes ingresar un máximo de 2 ingredientes.",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}

function msjErrorCantidadIngredientes() {
  Swal.fire({
    title: "Error",
    text: "No hay ingredientes ingresados. Ingresa hasta 2 (dos) ingredientes.",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}