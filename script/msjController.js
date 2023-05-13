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

