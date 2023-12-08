let B7validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = document.querySelectorAll('input');

        B7validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7validator.checkInput(input);
            if (check !== true) {
                send = false;
                B7validator.showError(input, check);
            }
        }

        if (send) {
            document.querySelector('.b7validator').submit();
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value === '') {
                            return 'Campo não pode ser vazio';
                        }
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'campo tem que ter pelos menos '+rDetails+' carcters';
                        }
                        break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)[a-zA-Z]{2,}))$/;
                            if(regex.test(input.value.toLowerCase())) {
                                return 'e-mail digitado não é válido.';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },

showError: (input, errorMessage) => {
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = errorMessage; // Usar a mensagem de erro recebida como parâmetro

    input.parentElement.insertBefore(errorElement, input.nextElementSibling);
},

clearErrors: () => {
    let inputs = form.querySelectorAll('input');
    for (i = 0; i < inputs.length; i++) {
        inputs[i].style = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
        errorElements[i].remove();
    }
}


};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7validator.handleSubmit);