const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email')
const textArea = document.getElementById('text-area')


// Function to set error


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    errorDisplay.classList.remove('success')
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}


// Function to set success


const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    errorDisplay.classList.add('success')
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

};


// Function to create literal expression 


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}





// Function to validate inputs


const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const textAreaValue = textArea.value.trim()

    if (usernameValue === '') {
        setError(username, 'Este campo es obligatorio.');
        // errorDisplay.classList.remove('success');
    } else {
        setSuccess(username, '¡Se bién!');
    }

    if (emailValue === '') {
        setError(email, 'Este campo es obligatorio.');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Por favor ingresá un email válido.');
    } else {
        setSuccess(email, '¡Se ve bien!');
    }

    if (textAreaValue === '') {
        setError(textArea, 'Por favor, ingresá un mensaje.');
    } else {
        setSuccess(textArea, '¡Se ve bien!')
    }
};


// Function to init constact section


export const contactSectionInit = () => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });
}