let presupuesto = 0;
let gastos = [];

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
  const presupuestoInput = document.getElementById("presupuesto-input");
  const botonPresupuesto = document.getElementById("guardar-presupuesto");
  const gastoNombre = document.getElementById("gasto-nombre");
  const gastoMonto = document.getElementById("gasto-monto");
  const botonGasto = document.getElementById("agregar-gasto");
  const botonBorrar = document.getElementById("borrar-datos");

  if(localStorage.getItem("presupuesto")) presupuesto = parseFloat(localStorage.getItem("presupuesto"));
  if(localStorage.getItem("gastos")) gastos = JSON.parse(localStorage.getItem("gastos"));

  botonPresupuesto.addEventListener("click", guardarPresupuesto);
  botonGasto.addEventListener("click", agregarGasto);
  botonBorrar.addEventListener("click", borrarDatos);

  actualizar();
}

function guardarPresupuesto() {
  let presupuestoInput = document.getElementById("presupuesto-input");
  let valor = parseFloat(presupuestoInput.value);
  if(!isNaN(valor) && valor > 0) {
    presupuesto = valor;
    localStorage.setItem("presupuesto", presupuesto);
    presupuestoInput.value = "";
    actualizar();
  }
}

function agregarGasto() {
  let gastoNombre = document.getElementById("gasto-nombre");
  let gastoMonto = document.getElementById("gasto-monto");
  let valor = parseFloat(gastoMonto.value);
  if(gastoNombre.value && !isNaN(valor) && valor > 0) {
    gastos.push({nombre: gastoNombre.value, monto: valor});
    localStorage.setItem("gastos", JSON.stringify(gastos));
    gastoNombre.value = "";
    gastoMonto.value = "";
    actualizar();
  }
}

function borrarDatos() {
  localStorage.removeItem("presupuesto");
  localStorage.removeItem("gastos");
  presupuesto = 0;
  gastos = [];
  actualizar();
}

function actualizar() {
  const lista = document.getElementById("lista-gastos");
  const resumen = document.getElementById("resumen");
  lista.innerHTML = "";
  gastos.forEach((gasto, i) => {
    let li = document.createElement("li");
    li.textContent = gasto.nombre + " $" + gasto.monto;
    li.addEventListener("click", function() {
      gastos.splice(i,1);
      localStorage.setItem("gastos", JSON.stringify(gastos));
      actualizar();
    });
    lista.appendChild(li);
  });
  let total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);
  let restante = presupuesto - total;
  resumen.textContent = "Presupuesto: $" + presupuesto + " Gastado: $" + total + " Restante: $" + restante;
}