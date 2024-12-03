document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.table');
    const totalValueElement = document.getElementById('totalValue');
    const toggleValueButton = document.getElementById('toggleValue');
    const selectedNumbers = JSON.parse(localStorage.getItem('selectedNumbers')) || [];

    let isValueVisible = false; // Valor começa oculto

    // Função para atualizar o valor total
    function updateTotalValue() {
        const total = selectedNumbers.reduce((sum, num) => sum + num, 0);
        totalValueElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Alternar visibilidade do valor acumulado
    toggleValueButton.addEventListener('click', () => {
        isValueVisible = !isValueVisible;
        totalValueElement.style.visibility = isValueVisible ? 'visible' : 'hidden';
        toggleValueButton.src = isValueVisible ? 'olho.png' : 'olho-fechado.png';
    });

    // Cria os botões para os números de 1 a 255
    for (let i = 1; i <= 255; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('number');

        // Marca o botão como selecionado se já estiver no Local Storage
        if (selectedNumbers.includes(i)) {
            button.classList.add('selected');
        }

        // Adiciona o evento de clique
        button.addEventListener('click', () => {
            if (button.classList.contains('selected')) {
                // Remove a seleção
                button.classList.remove('selected');
                const index = selectedNumbers.indexOf(i);
                selectedNumbers.splice(index, 1);
            } else {
                // Adiciona a seleção
                button.classList.add('selected');
                selectedNumbers.push(i);
            }

            // Atualiza o Local Storage
            localStorage.setItem('selectedNumbers', JSON.stringify(selectedNumbers));
            // Atualiza o valor total
            updateTotalValue();
        });

        // Adiciona o botão na tabela
        table.appendChild(button);
    }

    // Atualiza o valor total ao carregar a página
    updateTotalValue();

    // Oculta o valor total inicialmente
    totalValueElement.style.visibility = 'hidden';
    toggleValueButton.src = 'olho-fechado.png';
});
