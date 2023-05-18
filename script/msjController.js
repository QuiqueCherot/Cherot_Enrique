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
    text: 'No hay recetas con esos ingredientes. Prueba con los principales.',
  });
}

function errorInesperado() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ha ocurrido un error inesperado. Porfavor intente nuevamente.',
  });
}