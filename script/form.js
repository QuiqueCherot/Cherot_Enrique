// Obtener referencia al enlace de "Contáctanos"
const formularioContacto = document.getElementById("formularioContacto");

// Agregar evento de clic al enlace
formularioContacto.addEventListener("click", () => {
  // Mostrar SweetAlert con el formulario
  Swal.fire({
    title: "Contáctanos",
    html: document.getElementById("formContacto").innerHTML,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: "Enviar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
    Swal.fire("¡Enviado!", "Gracias por contactarnos. Pronto te responderemos.", "success")
    }
  });
});