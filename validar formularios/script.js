// Capturar elementos del formulario
const form = document.getElementById('form');
const nomusuari = document.getElementById('nomusuari');
const email = document.getElementById('email');
const contrasenya = document.getElementById('contrasenya');
const contrasenya2 = document.getElementById('contrasenya2');

// Funciones para mostrar errores y correctos
function muestraError(input, mensaje) {
  const formControl = input.parentElement;
  formControl.classList.remove('correcte');
  formControl.classList.add('error');
  const label = formControl.querySelector('label');
  const small = formControl.querySelector('small');
  small.innerText = `${label.innerText}: ${mensaje}`;
}

function muestraCorrecto(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('correcte'); // 🔹 usa "correcte"
  const small = formControl.querySelector('small');
  small.innerText = '';
}


// Validar email con expresión regular
function esEmailValido(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
        muestraCorrecto(input);
        return true;
    } else {
        muestraError(input, 'no es válido');
        return false;
    }
}

// Función para comprobar campos obligatorios
function esObligatorio(inputArr) {
    let valido = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            muestraError(input, 'es obligatorio');
            valido = false;
        } else {
            muestraCorrecto(input);
        }
    });
    return valido;
}

// ✅ Nueva función para comprobar la longitud de varios elementos
function compruebaLongitud(inputsArr) {
    let todoCorrecto = true;

    inputsArr.forEach(({ input, min, max }) => {
        if (input.value.length < min) {
            muestraError(input, `debe tener al menos ${min} caracteres`);
            todoCorrecto = false;
        } else if (input.value.length > max) {
            muestraError(input, `debe tener menos de ${max} caracteres`);
            todoCorrecto = false;
        } else {
            muestraCorrecto(input);
        }
    });

    return todoCorrecto;
}

// Función para comprobar que las contraseñas coinciden
function compruebaContrasenas(input1, input2) {
    if (input1.value !== input2.value) {
        muestraError(input2, 'no coincide');
        return false;
    } else {
        muestraCorrecto(input2);
        return true;
    }
}

// Evento del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Comprobar campos obligatorios
    const obligatorioOK = esObligatorio([nomusuari, email, contrasenya, contrasenya2]);

    // Si los campos obligatorios están completos, validar el resto
    if (obligatorioOK) {
        const emailOK = esEmailValido(email);

        const longitudesOK = compruebaLongitud([
            { input: nomusuari, min: 3, max: 15 },
            { input: contrasenya, min: 6, max: 25 }
        ]);
        const contrasenasCoinciden = compruebaContrasenas(contrasenya, contrasenya2);

        if (emailOK && longitudesOK && contrasenasCoinciden) {
            console.log(' ¡Formulario válido!');
        } else {
            console.log('⚠️ Hay errores en el formulario.');
        }
    }
});
