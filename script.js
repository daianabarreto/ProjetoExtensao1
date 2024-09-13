document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('overtime-form');
    const overtimeList = document.getElementById('overtime-list');

    // Função para renderizar o histórico salvo no localStorage
    const renderSavedOvertime = () => {
        const savedOvertime = JSON.parse(localStorage.getItem('overtimeRecords')) || [];
        savedOvertime.forEach(record => {
            const listItem = document.createElement('li');
            listItem.textContent = `Funcionário: ${record.employeeName}, Data: ${record.date}, Horas Extras: ${record.diffInHours} horas`;
            overtimeList.appendChild(listItem);
        });
    };

    // Chama a função para renderizar os dados ao carregar a página
    renderSavedOvertime();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const employeeName = document.getElementById('employee-name').value;
        const date = document.getElementById('date').value;
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        // Validar dados
        if (!employeeName || !date || !startTime || !endTime) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Calcular horas extras
        const start = new Date(`${date}T${startTime}`);
        const end = new Date(`${date}T${endTime}`);
        const diffInMs = end - start;
        const diffInHours = (diffInMs / 1000 / 60 / 60).toFixed(2);

        // Adicionar ao histórico (na interface)
        const listItem = document.createElement('li');
        listItem.textContent = `Funcionário: ${employeeName}, Data: ${date}, Horas Extras: ${diffInHours} horas`;
        overtimeList.appendChild(listItem);

        // Guardar no localStorage
        const savedOvertime = JSON.parse(localStorage.getItem('overtimeRecords')) || [];
        savedOvertime.push({ employeeName, date, diffInHours });
        localStorage.setItem('overtimeRecords', JSON.stringify(savedOvertime));

        // Limpar formulário
        form.reset();
    });
});
