/*
let numerosIngresados = [];

function actualizarNumero() {
  const input = document.getElementById("input-numero");
  const numero = parseInt(input.value);

  if (!isNaN(numero) && numero >= 1 && numero <= 75) {
    document.getElementById("numero").textContent = numero;
    numerosIngresados.push(numero);
    actualizarTablero();
    actualizarHistorial();
    input.value = ""; // limpiar la caja después de ingresar
  } else {
    alert("Por favor, ingresa un número válido entre 1 y 75.");
  }
}

function actualizarTablero() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = `
    <div class="celda-tablero letra-columna">B</div>
    <div class="celda-tablero letra-columna">I</div>
    <div class="celda-tablero letra-columna">N</div>
    <div class="celda-tablero letra-columna">G</div>
    <div class="celda-tablero letra-columna">O</div>
  `;

  for (let fila = 0; fila < 15; fila++) {
    for (let col = 0; col < 5; col++) {
      let numero = fila + 1 + col * 15;
      let clase = "celda-tablero";
      if (numerosIngresados.includes(numero)) {
        clase += " numero-activo";
      }
      tablero.innerHTML += `<div class="${clase}">${numero}</div>`;
    }
  }
}

function actualizarHistorial() {
  const historialContainer = document.getElementById("historial-container");
  const bolas = historialContainer.getElementsByClassName("bola-pequeña");

  for (let i = 0; i < 3; i++) {
    const bola = bolas[i];
    bola.textContent = numerosIngresados[numerosIngresados.length - 1 - i] || 0;
  }
}

function generarNumeroAleatorio() {
  const numero = Math.floor(Math.random() * 75) + 1; // aleatorio entre 1 y 75

  if (!numerosIngresados.includes(numero)) {
    document.getElementById("numero").textContent = numero;
    numerosIngresados.push(numero);
    actualizarTablero();
    actualizarHistorial();
  } else {
    // si ya salió, busca otro (hasta encontrar uno nuevo)
    if (numerosIngresados.length < 75) {
      generarNumeroAleatorio();
    } else {
      alert("Ya salieron todos los números.");
    }
  }
}


function resetJuego() {
  numerosIngresados = []; // vaciar lista de números
  document.getElementById("numero").textContent = 0; // reiniciar bola grande
  actualizarTablero(); // tablero limpio
  actualizarHistorial(); // historial vacío
}

document.getElementById("boton-reset").addEventListener("click", resetJuego);

document.getElementById("boton-aleatorio").addEventListener("click", generarNumeroAleatorio);
document.getElementById("boton-ingresar").addEventListener("click", actualizarNumero);
document.getElementById("input-numero").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    actualizarNumero();
  }
});

actualizarTablero();
*/
let numerosIngresados = [];

function getLetterForNumber(number) {
  if (number >= 1 && number <= 15) return "B";
  if (number >= 16 && number <= 30) return "I";
  if (number >= 31 && number <= 45) return "N";
  if (number >= 46 && number <= 60) return "G";
  if (number >= 61 && number <= 75) return "O";
}

function actualizarNumero() {
  const input = document.getElementById("input-numero");
  const numero = parseInt(input.value);

  if (!isNaN(numero) && numero >= 1 && numero <= 75) {
    // 👉 bola grande con letra en bold
    document.getElementById("numero").innerHTML =
      `<span class="letra-bola">${getLetterForNumber(numero)}</span>${numero}`;
      cantarBolilla(numero);
    numerosIngresados.push(numero);
    actualizarTablero();
    actualizarHistorial();
    input.value = ""; // limpiar la caja después de ingresar
  } else {
    alert("Por favor, ingresa un número válido entre 1 y 75.");
  }
}
function cantarBolilla(numero) {
  const letra = getLetterForNumber(numero);
  const texto = `${letra} ${numero}`; // ej: "B 2"

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "es-MX"; // español (puedes probar "es-MX" o "en-US")
  utterance.rate = 0.9;     // velocidad (0.5 más lento, 2 más rápido)
  utterance.pitch = 1.0;    // tono
  utterance.volume = 1.0;   // volumen (0 a 1)

  speechSynthesis.speak(utterance);
}

function actualizarTablero() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = `
    <div class="celda-tablero letra-columna">B</div>
    <div class="celda-tablero letra-columna">I</div>
    <div class="celda-tablero letra-columna">N</div>
    <div class="celda-tablero letra-columna">G</div>
    <div class="celda-tablero letra-columna">O</div>
  `;

  for (let fila = 0; fila < 15; fila++) {
    for (let col = 0; col < 5; col++) {
      let numero = fila + 1 + col * 15;
      let clase = "celda-tablero";
      if (numerosIngresados.includes(numero)) {
        clase += " numero-activo";
      }
      tablero.innerHTML += `<div class="${clase}">${numero}</div>`; // 👈 tablero solo números
    }
  }
}

function actualizarHistorial() {
  const historialContainer = document.getElementById("historial-container");
  const bolas = historialContainer.getElementsByClassName("bola-pequeña");

  for (let i = 0; i < 3; i++) {
    const bola = bolas[i];
    let num = numerosIngresados[numerosIngresados.length - 1 - i];
    // 👉 historial con letra en bold
    bola.innerHTML = num
      ? `<span class="letra-bola">${getLetterForNumber(num)}</span>${num}`
      : 0;
  }
}

function generarNumeroAleatorio() {
  if (numerosIngresados.length >= 75) {
    alert("Ya salieron todos los números.");
    return;
  }

  let numero;
  do {
    numero = Math.floor(Math.random() * 75) + 1;
  } while (numerosIngresados.includes(numero));

  // 👉 bola grande con letra en bold
  document.getElementById("numero").innerHTML =
    `<span class="letra-bola">${getLetterForNumber(numero)}</span>${numero}`;
    cantarBolilla(numero); 
  numerosIngresados.push(numero);
  actualizarTablero();
  actualizarHistorial();
}

function resetJuego() {
  numerosIngresados = []; // vaciar lista de números
  document.getElementById("numero").textContent = 0; // reiniciar bola grande
  actualizarTablero(); // tablero limpio
  actualizarHistorial(); // historial vacío
}

document.getElementById("boton-reset").addEventListener("click", resetJuego);
document.getElementById("boton-aleatorio").addEventListener("click", generarNumeroAleatorio);
document.getElementById("boton-ingresar").addEventListener("click", actualizarNumero);
document.getElementById("input-numero").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    actualizarNumero();
  }
});

actualizarTablero();
