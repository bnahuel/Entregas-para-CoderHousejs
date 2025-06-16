let presupuesto;
let gasto;
let nombreGasto;
let seguir = true;
let listaGastos = [];

presupuesto = prompt("¿Cuál es tu presupuesto?");
presupuesto = parseFloat(presupuesto);

alert("Tu presupuesto es: $" + presupuesto);
console.log("Presupuesto: $" + presupuesto);


while (seguir) {
    nombreGasto = prompt("¿En qué gastaste?");
    gasto = prompt("¿Cuánto gastaste?");
    gasto = parseFloat(gasto);

    listaGastos.push({ nombre: nombreGasto, monto: gasto });

    seguir = confirm("¿Querés agregar otro gasto?");
}

console.log("------ LISTA DE GASTOS ------");
let totalGastos = 0;

let i = 0;
const total = listaGastos.length;

for ( i ; i < total; i++) {
    console.log((i + 1) + ". " + listaGastos[i].nombre + ": $" + listaGastos[i].monto);
    totalGastos += listaGastos[i].monto;
}

let dineroRestante = presupuesto - totalGastos;

alert("Gastos totales: $" + totalGastos + "\nDinero restante: $" + dineroRestante);
console.log("Total gastado: $" + totalGastos);
console.log("Dinero restante: $" + dineroRestante);