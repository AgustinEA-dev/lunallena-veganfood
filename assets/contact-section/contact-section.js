const form = document.querySelector('.contact-form')
const submitBtn = document.querySelector('.submit-btn')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')


// Función para prevenir el default del formulario.


const preventDefault = (e) => {
    e.preventDefault()
}


// Función para validar nameInput.


export const nameValidator = nameInput.addEventListener('input', (e) => {
    if (!nameInput.attributes.type.value === 'text') {
        nameInput.setCustomValidity('El nombre es obligatorio')
    } else {
        nameInput.setCustomValidity('')
    }
})


// Función para validar emailInput.

export const emailValidator = emailInput.addEventListener('input', (e) => {
    if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity('Ingresá un email válido')
    } else {
        emailInput.setCustomValidity('')
    }
})


export const contactSectionInit = () => {
    form.addEventListener('submit', preventDefault)
    emailValidator
    nameValidator
    console.dir(nameInput)
}