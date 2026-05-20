const urlAuto = 'http://localhost:3000/carro';
const urlAlojamento = 'http://localhost:3000/alojamento';

carregarDados();

function carregarDados() {
    fetch(urlAuto + '/listar').then(res => res.json()).then(data => listarAutomoveis(data));
    fetch(urlAlojamento + '/listar').then(res => res.json()).then(data => listarAlojamentos(data));
}

function listarAutomoveis(lista) {
    const cont = document.getElementById('automoveis-container');
    cont.innerHTML = '';
    lista.forEach(a => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${a.placa}</h3>
            <p><strong>Dono:</strong> ${a.proprietario}</p>
            <p><strong>Marca/Modelo:</strong> ${a.marca} ${a.modelo}</p>
            <p><strong>Tipo:</strong> ${a.tipo} | <strong>Ano:</strong> ${a.ano}</p>
            <button onclick="excluirAuto('${a.placa}')" style="background:#ff4d4d; color:white; border:none; padding:5px; border-radius:5px; margin-top:10px; cursor:pointer;">Excluir</button>
        `;
        cont.appendChild(card);
    });
}

function listarAlojamentos(lista) {
    const cont = document.getElementById('alojamentos-container');
    cont.innerHTML = '';
    lista.forEach(e => {
        const card = document.createElement('div');
        card.className = 'card';
        if (e.saida) card.style.background = "#2d5a88";

        card.innerHTML = `
            <h3>Placa: ${e.placa}</h3>
            <p>Entrada: ${new Date(e.entrada).toLocaleString()}</p>
            ${e.saida ? `<p>Saída: ${new Date(e.saida).toLocaleString()}</p><h4>Total: R$ ${e.valorTotal}</h4>` : `<p><b>STATUS: ATIVO</b></p>`}
            
            <div style="margin-top:15px; display:flex; gap:10px;">
                ${!e.saida ? `<button onclick="finalizarAlojamentoId(${e.id})" style="background:#28a745; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; flex:1;">Finalizar</button>` : ''}
                <button onclick="excluirAlojamentoId(${e.id})" style="background:#dc3545; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; flex:1;">Excluir</button>
            </div>
        `;
        cont.appendChild(card);
    });
}

function cadastrarCarro(event) {
    event.preventDefault();
    
    const dados = {
        placa: document.getElementById('placa').value,
        proprietario: document.getElementById('proprietario').value,
        tipo: document.getElementById('tipo').value,
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value,
        cor: document.getElementById('cor').value,
        ano: Number(document.getElementById('ano').value), 
        telefone: document.getElementById('telefone').value
    };

    fetch(urlAuto + '/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar veículo");
        fecharModais();
        carregarDados();
    })
    .catch(err => alert(err.message));
}

function cadastrarAlojamento(event) {
    event.preventDefault();
    const dados = {
        placa: document.getElementById('alojamento-placa').value,
        valorHora: Number(document.getElementById('valorHora').value)
    };
    fetch(urlAlojamento + '/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }).then(() => { fecharModais(); carregarDados(); });
}

function finalizarAlojamentoId(id) {
    fetch(urlAlojamento + '/atualizar/' + id, { method: 'PUT' }).then(() => carregarDados());
}

function excluirAlojamentoId(id) {
    if(!confirm("Excluir alojamento?")) return;
    fetch(urlAlojamento + '/excluir/' + id, { method: 'DELETE' }).then(() => carregarDados());
}

function excluirAuto(placa) {
    if(!confirm("Excluir veículo?")) return;
    fetch(urlAuto + '/excluir/' + placa, { method: 'DELETE' }).then(() => carregarDados());
}

function abrirCadastroAuto() {
    document.getElementById('modalAuto').style.display = 'flex';
    document.querySelector('#modalAuto form').reset();
}

function abrirCadastroAlojamento() {
    document.getElementById('modalAlojamento').style.display = 'flex';
    document.querySelector('#modalAlojamento form').reset();
}

function fecharModais() {
    document.getElementById('modalAuto').style.display = 'none';
    document.getElementById('modalAlojamento').style.display = 'none';
}