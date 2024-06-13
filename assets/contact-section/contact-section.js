import Swal from "sweetalert2/dist/sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email')
const textArea = document.getElementById('text-area')


// Empty field validation.


const isEmpty = (input) => {  // false no esta vacio | true, esta vacio
    return !input.value.trim().length;
};


const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};


//Email validation.


const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    //testeamos
    return re.test(input.value.trim());
};


// Error and success logic.


const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = message;


};

const showSuccess = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = message;

};


// Input validators

const checkTextInput = (input) => {
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 25;

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio")
        return;
    }
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`);
        return;
    }

    showSuccess(input, "¡Se ve bién!");
    valid = true;
    return valid;
}


const checkEmail = (input) => {

    let valid = false;
    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio")
        return;
    }

    if (!isEmailValid(input)) {
        showError(input, "El email no es válido");
        return;
    }

    showSuccess(input, "¡Se ve bién!");
    valid = true;
    return valid;

}

const checkTextArea = (input) => {
    let valid = false
    const minCharacters = 60
    const maxCharacters = 500


    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio")
        return;
    }
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`);
        return;
    }

    showSuccess(input, "¡Se ve bién!");
    valid = true;
    return valid;


}

// General validation en data store.


const validateForm = (e) => {
    e.preventDefault();

    let isNameValid = checkTextInput(username);
    let isEmailValid = checkEmail(email);
    let isTextAreaValid = checkTextArea(textArea)
    let isValidForm = isNameValid && isEmailValid && isTextAreaValid

    const exito = {
        title: '¡Mensaje envíado!',
        text: 'Te responderemos a la brevedad',
        icon: 'success',
        showConfirmButton: false,
        color: "#18282f",
        timer: 2500,
    }

    if (isValidForm) {
        Swal.fire(exito);
        form.reset()
    }

}

// Contact section init

export const contactSectionInit = () => {
    form.addEventListener("submit", validateForm);
    username.addEventListener("input", () => checkTextInput(username));
    email.addEventListener("input", () => checkEmail(email));
    textArea.addEventListener("input", () => checkTextArea(textArea))
};
