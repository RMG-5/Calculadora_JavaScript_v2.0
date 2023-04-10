/* ********** ********** ********** ********** ********** ********** ********** */
// FUNCIONES "CALCULADORA ESTANDAR JAVASCRIPT" 
/* ********** ********** ********** ********** ********** ********** ********** */

// VARIABLES GLOBALES //
const pantallaMemoria = document.querySelector("#pantalla_memoria");
const pantallaActual = document.querySelector("#pantalla_actual");

const botonResetear = document.querySelector("#boton_resetear");

const botonPorcentaje = document.querySelector("#boton_porcentaje");
const botonInverso = document.querySelector("#boton_inverso");
const botonCuadrado = document.querySelector("#boton_cuadrado");
const botonRaiz = document.querySelector("#boton_raiz");

const botonPI = document.querySelector("#boton_pi");

const botonDividir = document.querySelector("#boton_dividir");
const botonMultiplicar = document.querySelector("#boton_multiplicar");
const botonRestar = document.querySelector("#boton_restar");
const botonSumar = document.querySelector("#boton_sumar");

const botonMasMenos = document.querySelector("#boton_mas_menos");
const botonPunto = document.querySelector("#boton_punto");

const botonIgual = document.querySelector("#boton_igual");

const botonNumero = document.querySelectorAll(".numero");

let numero = 0;
let memoria = 0;
let operacion = "";  // INDICA CUAL FUE EL ÚLTIMO OPERADOR QUE SE UTILIZO.
let ultima = "";     // INDICA CUAL FUE EL ÚTLIMO BOTON QUE SE PRESIONO.

// RESETEAR //
botonResetear.addEventListener("click", () => {
  // AL PRESIONAR EL BOTON "C" LA pantalla_memoria SE BORRA.
  pantallaMemoria.value = "";
  // AL PRESIONAR EL BOTON "C" LA pantalla_actual SE BORRA.
  pantallaActual.value = 0;
  // AL PRESIONAR EL BOTON "C" SE RESTABLECE EL VALOR DE TODAS LAS VARIABLES GLOBALES.
  numero = 0;
  memoria = 0;
  operacion = "";
  ultima = "";
});


// DIGITAR NUMERO //
botonNumero.forEach((boton) => {
  boton.addEventListener("click", () => {    
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "=, ²√, x², ¹/x, % ó π" HACE UN RESETEO Y CONTINUA.
  if(operacion === "=" || ultima === "r" || ultima === "c" || ultima === "i" || ultima === "p" || ultima === "π") {
    numero = 0;
    memoria = 0;
    pantallaMemoria.value = "";
    pantallaActual.value = numero + parseInt(boton.value, 10);
    numero = pantallaActual.value;
    operacion = "";    
  } 
  // SI EL VALOR DE pantalla_actual ES IGUAL A "-0" ELIMINA EL "0" Y CONTINUA.
  else if (numero === "-0") {
    numero = "-";
    pantallaActual.value = numero + parseInt(boton.value, 10);
    numero = pantallaActual.value;
  } 
  // SI EL VALOR DE pantalla_actual ES IGUAL A "0" NO PERMITE ESCRIBIR MÁS CEROS.
  else if (numero === "0") {
    numero = "";
    pantallaActual.value = numero + parseInt(boton.value, 10);
    numero = pantallaActual.value;  
  } else {  // SI NO SE PRESENTA NINGUNO DE LOS CASOS ANTERIORES PERMITE ESCRIBIR NUMEROS DEL 0 AL 9.
    pantallaActual.value = numero + parseInt(boton.value, 10);
    numero = pantallaActual.value;
  }    
  ultima = "";
  });
});


// PUNTO DECIMAL //
botonPunto.addEventListener("click", () => {
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "=, ²√, x², ¹/x, % ó π" HACE UN RESETEO Y CONTINUA.
  if(operacion === "=" || ultima === "r" || ultima === "c" || ultima === "i" || ultima === "p" || ultima === "π") {
    numero = 0;
    memoria = 0;
    pantallaMemoria.value = "";
    pantallaActual.value = numero + ".";
    numero = numero + ".";
    operacion = "";
    ultima = "";   
  } 
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" pantalla_actual SERA IGUAL A "0."
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaActual.value = numero + ".";
    numero = numero + ".";
  }
  // SI pantalla_actual CONTIENE UN "." LA FUNCIÓN NO HACE NADA.
  else if(pantallaActual.value.includes(".")) {
    //NO HACER NADA.
  } else {  // SI pantalla_actual NO CONTIENE UN "." SE AGREGA AL FINAL DEL NÚMERO.
    pantallaActual.value = numero + ".";
    numero = numero + ".";
  } 
});


// CAMBIAR SIGNO //
botonMasMenos.addEventListener("click", () => {
  // SI pantalla_actual ES IGUAL A "0" O EL ULTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" pantalla_actual SERA IGUAL A "-0".
  if (pantallaActual.value === "0" || ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaActual.value = "-0";
    numero = "-0";
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "=, ²√, x², ¹/x ó %" HACE UN RESETEO Y CONTINUA.
  else if (operacion === "=" || ultima === "r" || ultima === "c" || ultima === "i" || ultima === "p") {
    pantallaMemoria.value = "";
    pantallaActual.value = "-0";
    numero = "-0";
    operacion = "";
  }
  // SI pantalla_actual INICIA CON EL SIGNO "-" RETIRA EL SIGNO Y CONTINUA.
  else if(pantallaActual.value.startsWith("-")) {
    pantallaActual.value = numero.slice(1);   
    numero = pantallaActual.value;         
  } 
  // SI pantalla_actual NO INICIA CON EL SIGNO "-" AGREGA EL SIGNO Y CONTINUA.
  else if(!pantallaActual.value.startsWith("-")) {
    pantallaActual.value = "-" + pantallaActual.value;
    numero = pantallaActual.value;
  }   
  ultima = "";
});


// SUMAR //
botonSumar.addEventListener("click", () => {
  // SI pantalla_memoria ESTA VACIA Y pantalla_actual ES IGUAL A "0" UTILIZA "0" COMO PRIMER SUMANDO.
  if(pantallaMemoria.value === "" && pantallaActual.value === "0") {
    pantallaMemoria.value = 0 + " +";
  }
  // SI EL ULTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" MANTIENE O CONVIERTE LA SIGUIENTE OPERACIÓN EN UNA SUMA.
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaMemoria.value = memoria + " +";
    pantallaActual.value = memoria;
  }
  // SI NO SE A REALIZADO NINGUNA OPERACIÓN LA SIGUIENTE OPERACIÓN SERA UNA SUMA.
  else if(operacion === "") {
    pantallaMemoria.value = parseFloat(numero) + " +";
    pantallaActual.value = parseFloat(numero);
    memoria = numero;
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "+" REALIZA LA SUMA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA SUMA.
  else if(operacion === "+") {
    pantallaMemoria.value = parseFloat(memoria) + parseFloat(numero) + " +";
    pantallaActual.value = parseFloat(memoria) + parseFloat(numero);
    memoria = parseFloat(memoria) + parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "-" REALIZA LA RESTA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA SUMA.
  else if(operacion === "-") {
    pantallaMemoria.value = parseFloat(memoria) - parseFloat(numero) + " +";
    pantallaActual.value = parseFloat(memoria) - parseFloat(numero);
    memoria = parseFloat(memoria) - parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "x" REALIZA LA MULTIPLICACIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA SUMA.
  else if(operacion === "*") {
    pantallaMemoria.value = parseFloat(memoria) * parseFloat(numero) + " +";
    pantallaActual.value = parseFloat(memoria) * parseFloat(numero);
    memoria = parseFloat(memoria) * parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "÷" REALIZA LA DIVISIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA SUMA.
  else if(operacion === "/") {
    pantallaMemoria.value = parseFloat(memoria) / parseFloat(numero) + " +";
    pantallaActual.value = parseFloat(memoria) / parseFloat(numero);
    memoria = parseFloat(memoria) / parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO PRIMER SUMANDO Y PREPARA LA SIGUIENTE OPERACIÓN.
  else if(operacion === "=") {
    pantallaMemoria.value = parseFloat(memoria) + " +";
    pantallaActual.value = parseFloat(memoria);
    //memoria = parseFloat(numero);
  }
  numero = 0;
  operacion = "+";  
  ultima = "+";
});


// RESTAR //
botonRestar.addEventListener("click", () => {
// SI pantalla_memoria ESTA VACIA Y pantalla_actual ES IGUAL A "0" UTILIZA "0" COMO MINUENDO.
if (pantallaMemoria.value === "" && pantallaActual.value === "0") {
  pantallaMemoria.value = 0 + " -";
}
// SI EL ULTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" MANTIENE O CONVIERTE LA SIGUIENTE OPERACIÓN EN UNA RESTA.
else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
  pantallaMemoria.value = memoria + " -";
  pantallaActual.value = memoria;
}
// SI NO SE A REALIZADO NINGUNA OPERACIÓN LA SIGUIENTE OPERACIÓN SERA UNA RESTA.
else if(operacion === "") {
  pantallaMemoria.value = parseFloat(numero) + " -";
  pantallaActual.value = parseFloat(numero);
  memoria = numero;
}
// SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "-" REALIZA LA RESTA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA RESTA.
else if (operacion === "-") {
  pantallaMemoria.value = parseFloat(memoria) - parseFloat(numero) + " -";
  pantallaActual.value = parseFloat(memoria) - parseFloat(numero);
  memoria = parseFloat(memoria) - parseFloat(numero);    
}
// SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "+" REALIZA LA SUMA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA RESTA.
else if(operacion === "+") {
  pantallaMemoria.value = parseFloat(memoria) + parseFloat(numero) + " -";
  pantallaActual.value = parseFloat(memoria) + parseFloat(numero);
  memoria = parseFloat(memoria) + parseFloat(numero);
}
// SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "x" REALIZA LA MULTIPLICACIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA RESTA.
else if(operacion === "*") {
  pantallaMemoria.value = parseFloat(memoria) * parseFloat(numero) + " -";
  pantallaActual.value = parseFloat(memoria) * parseFloat(numero);
  memoria = parseFloat(memoria) * parseFloat(numero);
}
// SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "÷" REALIZA LA DIVISIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA RESTA.
else if(operacion === "/") {
  pantallaMemoria.value = parseFloat(memoria) / parseFloat(numero) + " -";
  pantallaActual.value = parseFloat(memoria) / parseFloat(numero);
  memoria = parseFloat(memoria) / parseFloat(numero);
}
// SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO MINUENDO Y PREPARA LA SIGUIENTE OPERACIÓN.
else if(operacion === "=") {
  pantallaMemoria.value = parseFloat(memoria) + " -";
  pantallaActual.value = parseFloat(memoria);
}
numero = 0;
operacion = "-";
ultima = "-";
});


// MULTIPLICAR //
botonMultiplicar.addEventListener("click", () => {
  // SI pantalla_memoria ESTA VACIA Y pantalla_actual ES IGUAL A "0" UTILIZA "0" COMO PRIMER FACTOR.
  if (pantallaMemoria.value === "" && pantallaActual.value === "0") {
    pantallaMemoria.value = 0 + " x";
  }
  // SI EL ULTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" MANTIENE O CONVIERTE LA SIGUIENTE OPERACIÓN EN UNA MULTIPLICACIÓN.
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaMemoria.value = memoria + " x";
    pantallaActual.value = memoria;
  }
  // SI NO SE A REALIZADO NINGUNA OPERACIÓN LA SIGUIENTE OPERACIÓN SERA UNA MULTIPLICACIÓN.
  else if(operacion === "") {
    pantallaMemoria.value = parseFloat(numero) + " x";
    pantallaActual.value = parseFloat(numero);
    memoria = numero;
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "x" REALIZA LA MULTIPLICACIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA MULTIPLICACIÓN.
  else if (operacion === "*") {
    pantallaMemoria.value = parseFloat(memoria) * parseFloat(numero) + " x";
    pantallaActual.value = parseFloat(memoria) * parseFloat(numero);
    memoria = parseFloat(memoria) * parseFloat(numero);    
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "+" REALIZA LA SUMA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA MULTIPLICACIÓN.
  else if(operacion === "+") {
    pantallaMemoria.value = parseFloat(memoria) + parseFloat(numero) + " x";
    pantallaActual.value = parseFloat(memoria) + parseFloat(numero);
    memoria = parseFloat(memoria) + parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "-" REALIZA LA RESTA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA MULTIPLICACIÓN.
  else if(operacion === "-") {
    pantallaMemoria.value = parseFloat(memoria) - parseFloat(numero) + " x";
    pantallaActual.value = parseFloat(memoria) - parseFloat(numero);
    memoria = parseFloat(memoria) - parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "÷" REALIZA LA DIVISIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA MULTIPLICACIÓN.
  else if(operacion === "/") {
    pantallaMemoria.value = parseFloat(memoria) / parseFloat(numero) + " x";
    pantallaActual.value = parseFloat(memoria) / parseFloat(numero);
    memoria = parseFloat(memoria) / parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO PRIMER FACTOR Y PREPARA LA SIGUIENTE OPERACIÓN.
  else if(operacion === "=") {
    pantallaMemoria.value = parseFloat(memoria) + " x";
    pantallaActual.value = parseFloat(memoria);
  }
  numero = 0;
  operacion = "*";
  ultima = "*"
});


// DIVIDIR //
botonDividir.addEventListener("click", () => {
  // SI pantalla_memoria ESTA VACIA Y pantalla_actual ES IGUAL A "0" UTILIZA "0" COMO DIVIDENDO.
  if (pantallaMemoria.value === "" && pantallaActual.value === "0") {
    pantallaMemoria.value = 0 + " ÷";
  }
  // SI EL ULTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" MANTIENE O CONVIERTE LA SIGUIENTE OPERACIÓN EN UNA DIVISIÓN.
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaMemoria.value = memoria + " ÷";
    pantallaActual.value = memoria;
  }
  // SI NO SE A REALIZADO NINGUNA OPERACIÓN LA SIGUIENTE OPERACIÓN SERA UNA DIVISIÓN.
  else if(operacion === "") {
    pantallaMemoria.value = parseFloat(numero) + " ÷";
    pantallaActual.value = parseFloat(numero);
    memoria = numero;
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "÷" REALIZA LA DIVISIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA DIVISIÓN.
  else if (operacion === "/") {
    pantallaMemoria.value = parseFloat(memoria) / parseFloat(numero) + " ÷";
    pantallaActual.value = parseFloat(memoria) / parseFloat(numero);
    memoria = parseFloat(memoria) / parseFloat(numero);    
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "+" REALIZA LA SUMA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA DIVISIÓN.
  else if(operacion === "+") {
    pantallaMemoria.value = parseFloat(memoria) + parseFloat(numero) + " ÷";
    pantallaActual.value = parseFloat(memoria) + parseFloat(numero);
    memoria = parseFloat(memoria) + parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "-" REALIZA LA RESTA Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA DIVISIÓN.
  else if(operacion === "-") {
    pantallaMemoria.value = parseFloat(memoria) - parseFloat(numero) + " ÷";
    pantallaActual.value = parseFloat(memoria) - parseFloat(numero);
    memoria = parseFloat(memoria) - parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "x" REALIZA LA MULTIPLICACIÓN Y PREPARA LA SIGUIENTE OPERACIÓN QUE SERA UNA DIVISIÓN.
  else if(operacion === "*") {
    pantallaMemoria.value = parseFloat(memoria) * parseFloat(numero) + " ÷";
    pantallaActual.value = parseFloat(memoria) * parseFloat(numero);
    memoria = parseFloat(memoria) * parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO PRIMER FACTOR Y PREPARA LA SIGUIENTE OPERACIÓN.
  else if(operacion === "=") {
    pantallaMemoria.value = parseFloat(memoria) + " ÷";
    pantallaActual.value = parseFloat(memoria);
  }
  numero = 0;
  operacion = "/";  
  ultima = "/";
});


// RESULTADO //
botonIgual.addEventListener("click", () => {
  // SI pantalla_memoria ESTA VACIA Y pantalla_actual ES IGUAL A "0" NO HACE NADA.
  if(pantallaMemoria.value === "" && pantallaActual.value === "0") {
    pantallaMemoria.value = "";
    pantallaActual.value = 0;   
  }
  // SI NO SE A REALIZADO NINGUNA OPERACIÓN NO HACE NADA.
  else if (operacion === "") {
    //NO HACER NADA.
    memoria = numero;
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "+" REALIZA LA SUMA Y GUARDA EL VALOR EN LA MEMORIA.
  else if (operacion === "+") {
    pantallaMemoria.value = parseFloat(memoria) + " + " + parseFloat(numero) + " =";
    pantallaActual.value = parseFloat(memoria) + parseFloat(numero);
    memoria = parseFloat(memoria) + parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "-" REALIZA LA RESTA Y GUARDA EL VALOR EN LA MEMORIA.
  else if (operacion === "-") {
    pantallaMemoria.value = parseFloat(memoria) + " - " + parseFloat(numero) + " =";
    pantallaActual.value = parseFloat(memoria) - parseFloat(numero);
    memoria = parseFloat(memoria) - parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "x" REALIZA LA MULTIPLICACIÓN Y GUARDA EL VALOR EN LA MEMORIA.
  else if (operacion === "*") {
    pantallaMemoria.value = parseFloat(memoria) + " x " + parseFloat(numero) + " =";
    pantallaActual.value = parseFloat(memoria) * parseFloat(numero);
    memoria = parseFloat(memoria) * parseFloat(numero);
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "÷" REALIZA LA DIVISIÓN Y GUARDA EL VALOR EN LA MEMORIA.
  else if (operacion === "/") {
    pantallaMemoria.value = parseFloat(memoria) + " ÷ " + parseFloat(numero) + " =";
    pantallaActual.value = parseFloat(memoria) / parseFloat(numero);
    memoria = parseFloat(memoria) / parseFloat(numero);
  }   
  numero = 0;
  operacion = "=";
});


// RAIZ //
botonRaiz.addEventListener("click", () => {
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO VALOR PARA OBTENER SU RAIZ CUADRADA.
  if(operacion === "=") {
    pantallaMemoria.value = "²√ " + parseFloat(memoria) + " =";
    pantallaActual.value = Math.sqrt(memoria);
    memoria = Math.sqrt(memoria);
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" Ó SI EL VALOR DE pantalla_actual ES MENOR QUE "0" MARCA UN ERROR Y REALIZA UN RESETEO.
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/" || numero < 0) {
    pantallaMemoria.value = "EXPRESIÓN INCORRECTA";
    pantallaActual.value = "ERROR";
    numero = 0;
    memoria = 0;
    operacion = "";
    ultima = "";
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "²√, x², ¹/x ó %" UTILIZA EL RESULTADO COMO VALOR PARA OBTENER SU RAIZ CUADRADA.
  else if(ultima === "c" || ultima === "r" || ultima === "i" || ultima === "p") {
    pantallaMemoria.value = "²√ " + parseFloat(numero) + " =";
    pantallaActual.value = Math.sqrt(numero);
    numero = Math.sqrt(numero);
  }
  // SI SE ESTA REALIZANDO UN CADENA DE OPERACIONES OBTIENE LA RAIZ CUADRADA DEL ULTIMO NUMERO Y LA AGREGA A LA CADENA.
  else if(pantallaMemoria.value !== "") {
    pantallaMemoria.value = pantallaMemoria.value + " ²√ " + parseFloat(numero);
    pantallaActual.value = "²√" + parseFloat(numero);
    numero = Math.sqrt(numero);  
  } else {  // SI NO SE PRESENTA NINGUNO DE LOS CASOS ANTERIORES UTILIZA EL VALOR DE pantalla_actual PARA OBTENER SU RAIZ CUADRADA.
    pantallaMemoria.value = "²√ " + parseFloat(numero) + " =";
    pantallaActual.value = Math.sqrt(numero);
    numero = Math.sqrt(numero);
  }
  ultima = "r";
});


// CUADRADO //
botonCuadrado.addEventListener("click", () => {
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO VALOR PARA OBTENER SU CUADRADO.
  if(operacion === "=") {
    pantallaMemoria.value = parseFloat(memoria) + "² =";
    pantallaActual.value = memoria * memoria;
    memoria = memoria * memoria;
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" MARCA UN ERROR Y REALIZA UN RESETEO.
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaMemoria.value = "EXPRESIÓN INCORRECTA";
    pantallaActual.value = "ERROR";
    numero = 0;
    memoria = 0;
    operacion = "";
    ultima = "";
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "²√, x², ¹/x ó %" UTILIZA EL RESULTADO COMO VALOR PARA OBTENER SU CUADRADO.
  else if(ultima === "c" || ultima === "r" || ultima === "i" || ultima === "p") {
    pantallaMemoria.value = parseFloat(numero) + "² =";
    pantallaActual.value = numero * numero;
    numero = numero * numero;
  }
  // SI SE ESTA REALIZANDO UN CADENA DE OPERACIONES OBTIENE EL CUADRADO DEL ULTIMO NUMERO Y LO AGREGA A LA CADENA.
  else if(pantallaMemoria.value !== "") {
    pantallaMemoria.value = pantallaMemoria.value + " " + parseFloat(numero) + "²";
    pantallaActual.value = parseFloat(numero) + "²";
    numero = numero * numero;
  } else {  // SI NO SE PRESENTA NINGUNO DE LOS CASOS ANTERIORES UTILIZA EL VALOR DE pantalla_actual PARA OBTENER SU CUADRADO.
    pantallaMemoria.value = parseFloat(numero) + "² =";
    pantallaActual.value = numero * numero;
    numero = numero * numero;
  }
  ultima = "c";
});


// INVERSO //
botonInverso.addEventListener("click", () => {
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "=" UTILIZA EL RESULTADO COMO VALOR PARA OBTENER SU INVERSO.
  if(operacion === "=") {
    pantallaMemoria.value = "¹/ " + parseFloat(memoria) + " =";
    pantallaActual.value = 1 / memoria;
    memoria = 1 / memoria;
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "+, -, x ó ÷" MARCA UN ERROR Y REALIZA UN RESETEO.
  else if(ultima === "+" || ultima === "-" || ultima === "*" || ultima === "/") {
    pantallaMemoria.value = "EXPRESIÓN INCORRECTA";
    pantallaActual.value = "ERROR";
    numero = 0;
    memoria = 0;
    operacion = "";
    ultima = "";
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "²√, x², ¹/x ó %" UTILIZA EL RESULTADO COMO VALOR PARA OBTENER SU INVERSO.
  else if(ultima === "c" || ultima === "r" || ultima === "i" || ultima === "p") {
    pantallaMemoria.value = "¹/ " + parseFloat(numero) + " =";
    pantallaActual.value = 1 / numero;
    numero = 1 / numero;
  }
  // SI SE ESTA REALIZANDO UN CADENA DE OPERACIONES OBTIENE EL INVERSO DEL ULTIMO NUMERO Y LO AGREGA A LA CADENA.
  else if(pantallaMemoria.value !== "") {
    pantallaMemoria.value = pantallaMemoria.value + " ¹/ " + parseFloat(numero);
    pantallaActual.value = "¹/" + parseFloat(numero);
    numero = 1 / numero;  
  } else {  // SI NO SE PRESENTA NINGUNO DE LOS CASOS ANTERIORES UTILIZA EL VALOR DE pantalla_actual PARA OBTENER SU INVERSO.
    pantallaMemoria.value = "¹/ " + parseFloat(numero) + " =";
    pantallaActual.value = 1 / numero;
    numero = 1 / numero;
  }
  ultima = "i";
});


// PORCENTAJE //
botonPorcentaje.addEventListener("click", () => {
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "+" REALIZA UNA SUMA ENTRE EL VALOR DE MEMORIA Y EL PORCENTAJE DADO.
  if(operacion === "+") {
    pantallaMemoria.value = parseFloat(memoria) + " + " + parseFloat(numero) + "% =";
    pantallaActual.value = parseFloat(memoria) + parseFloat(memoria) * parseFloat(numero) / 100;
    numero = parseFloat(memoria) + parseFloat(memoria) * parseFloat(numero) / 100;
  }  
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "-" REALIZA UNA RESTA ENTRE EL VALOR DE MEMORIA Y EL PORCENTAJE DADO.
  else if(operacion === "-") {
    pantallaMemoria.value = parseFloat(memoria) + " - " + parseFloat(numero) + "% =";
    pantallaActual.value = parseFloat(memoria) - parseFloat(memoria) * parseFloat(numero) / 100;
    numero = parseFloat(memoria) - parseFloat(memoria) * parseFloat(numero) / 100;
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "x" REALIZA UNA MULTIPLICACIÓN ENTRE EL VALOR DE MEMORIA Y EL PORCENTAJE DADO.
  else if(operacion === "*") {
    pantallaMemoria.value = parseFloat(memoria) + " x " + parseFloat(numero) + "% =";
    pantallaActual.value = parseFloat(memoria) * parseFloat(memoria) * parseFloat(numero) / 100;
    numero = parseFloat(memoria) * parseFloat(memoria) * parseFloat(numero) / 100;
  }
  // SI EL ÚLTIMO OPERADOR QUE SE PRESIONO FUE "÷" REALIZA UNA DIVISIÓN ENTRE EL VALOR DE MEMORIA Y EL PORCENTAJE DADO.
  else if(operacion === "/") {
    pantallaMemoria.value = parseFloat(memoria) + " ÷ " + parseFloat(numero) + "% =";
    pantallaActual.value = parseFloat(memoria) / (parseFloat(memoria) * parseFloat(numero) / 100);
    numero = parseFloat(memoria) / (parseFloat(memoria) * parseFloat(numero) / 100);
  } 
  operacion = "";
  ultima = "p";
});


// VALOR PI //
botonPI.addEventListener("click", () => {
  // SI NO SE A REALIZADO NINGUNA OPERACIÓN Y/O pantalla_actual ES IGUAL A "-0" ESCRIBE EL VALOR DE PI NEGATIVO EN LA pantalla_actual.
  if(operacion === "" && numero === "-0" || numero === "-0") {
    numero = "-";
    pantallaActual.value = numero + Math.PI;
    numero = pantallaActual.value;
  }
  // SI EL ÚLTIMO BOTON QUE SE PRESIONO FUE "=,²√, x², ¹/x ó %" HACE UN RESETEO Y CONTINUA.
  else if(operacion === "=" || ultima === "r" || ultima === "c" || ultima === "e" || ultima === "p" || ultima === "") {
    pantallaMemoria.value = "";
    pantallaActual.value = Math.PI;
    numero = Math.PI;    
    operacion = ""; 
  } else {  // ESCRIBE EL VALOR DE PI EN LA pantalla_actual.
    pantallaActual.value = Math.PI;
    numero = Math.PI;        
  }
  ultima = "π";
});

/* ********** ********** ********** ********** ********** ********** ********** */
/* ********** ********** ********** ********** ********** ********** ********** */