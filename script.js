async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    const loading = document.getElementById('loading');

    // Validação básica
    if (uf.length !== 2 || cidade.length < 3 || rua.length < 3) {
        alert("Por favor, preencha todos os campos corretamente (Mínimo 3 caracteres para cidade e rua).");
        return;
    }

    loading.style.display = 'block';
    resultadoDiv.innerHTML = '';

    try {
        // A API exige UF/Cidade/Rua. Exemplo: SP/Sao Paulo/Praca da Se
        const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;
        const response = await fetch(url);
        const data = await response.json();

        loading.style.display = 'none';

        if (data.length === 0) {
            resultadoDiv.innerHTML = '<p style="color:red">Nenhum CEP encontrado para este endereço.</p>';
        } else {
            // Como pode retornar mais de um CEP, fazemos um loop
            data.forEach(item => {
                resultadoDiv.innerHTML += `
                    <div class="cep-item">
                        <strong>${item.cep}</strong><br>
                        ${item.logradouro}<br>
                        ${item.bairro} - ${item.localidade}/${item.uf}
                    </div>
                `;
            });
        }
    } catch (error) {
        loading.style.display = 'none';
        alert("Erro ao consultar o servidor.");
    }
}