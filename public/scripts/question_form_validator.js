let perguntaForm = document.querySelector('#pergunta-form');

perguntaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Converte para um objeto comum antes de serializar
    let body = {}
    formData.forEach((value, key) => {
        body[key] = value;
    })

    const res = await fetch('/pergunta', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body),
    });

    const data = await res.json();

    const selected_alternative = document.querySelector(`#res${data.selected_alternative}`);
    const correct_alternative = document.querySelector(`#res${data.correct_alternative}`);

    if (data.is_correct) {
        selected_alternative.classList.add("correta");
    } else {
        selected_alternative.classList.add("errada");
        correct_alternative.classList.add("corrigida")
    }

    // Desabilita o botão
    document.querySelector('#answer-button').classList.add('invisible')
    document.querySelector('#next-question-button').classList.remove('invisible')

    // Desabilita o form, impedindo uma nova tentativa
    // Fraco, pois ainda é possível editar manualmente
    perguntaForm.inert = true;
});