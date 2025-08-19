const content = document.getElementById('detail')

async function persona(pesquisa) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${pesquisa}`)
        if (!response.ok) throw new Error('Character not found');
        return await response.json()

    }catch(error) {
        console.error('Fetch error:', error);
        return null;
    }
}
async function buscarID(id) {
    try {
        if (!id) throw new Error('id inválido')
        const res = await persona(id)
        return res
    }catch (e) {
        console.error('error:', e)
        return
    }
}
async function buscarName(name) {
    try {
        if (!name) throw new Error('nome invalido')
        const res = await persona(`?name=${name}`)
        return res.results[0]
    }catch (e) {
        console.error('error', e)
        return
    }
}
document.getElementById('btn-character').addEventListener('click', validaPersonaInput)

async function validaPersonaInput(e) {
    e.preventDefault()
    const nomePersona = document.getElementById("persona")
    const dataPersona = await buscarName(nomePersona.value)
    renderizaCard(dataPersona)
}

async function prevCharacter(id) {
    if (id < 1) return
    const dataPersona = await buscarID(id)
    renderizaCard(dataPersona)
}

async function nextCharacter(id) {
    const dataPersona = await buscarID(id)
    renderizaCard(dataPersona)
}

async function onload() {
    const dataPersona = await buscarID(1)
    renderizaCard(dataPersona)
}

async function renderizaCard(dados) {
    content.innerHTML = `
        <div class="card mt-5" style="max-width: 400px; margin: auto;">
        <img src="${dados.image}" class="card-img-top" alt="${dados.name}">
        <div class="card-body">
          <h5 class="card-title">${dados.name}</h5>
          <div class="card-text">
           <p> <strong>Nome:</strong> ${dados.name}</p>
            <p><strong>Espécie:</strong> ${dados.species}</p>
          </div>
          <div class="accordion" id="acordeaoPersona">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#btnCollapse" aria-expanded="false" aria-controls="btnCollapse">
                  Ver mais
                </button>
              </h2>
              <div id="btnCollapse" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#acordeaoPersona">
                <div class="accordion-body">
                  <p><strong>Mundo/Dimensão:</strong> ${dados.origin.name}</p>
                  <p><strong>Gênero:</strong>${dados.gender}</p>
                  <p><strong>Status:</strong> ${dados.status}</p>
                  <div class="mt-3 text-end">
            <button class="btn btn-info btn-sm" onclick="prevCharacter(${dados.id - 1})">Anterior</button>
            <button class="btn btn-success btn-sm" onclick="nextCharacter(${dados.id + 1})">Próximo</button>
          </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    `
}

