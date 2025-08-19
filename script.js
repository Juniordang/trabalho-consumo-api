const content = document.getElementById('content');
let page = Number(window.location.hash.replace("#", ""))
let maxpage = 0

async function getCharacters() {

  const response =
    await fetch(`https://rickandmortyapi.com/api/character${isNaN(page) ? '' : '?page=' + page}`)
  const data = await response.json()
  maxpage = data.info.pages
  const lista = document.createElement('div')
  lista.setAttribute('class', "row justify-content-center")
  let characters = ''
  data.results.forEach(element => {
    characters += `
    <div class="card m-0 mt-5 mx-2 col-3 " style="max-width: 400px; max-height: 400px; margin: auto;">
        <img src="${element.image}" class="card-img-top" alt="${element.name}">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <div class="card-text">
           <p> <strong>Nome:</strong> ${element.name}</p>
          </div>
        </div>
      </div>
    `
  });
  lista.innerHTML = characters
  content.appendChild(lista)

  let paginate
  if (!page || page === 1) {
    paginate = ` <button id="next" onClick="next()" class="btn btn-primary btn-sm" >Proximo</button>`
  }
  if (page > 1 && page < maxpage) {
    paginate = ` <button id="prev" onClick="prev()" class="btn btn-info btn-sm">Anterior</button>
    <button id="next" onClick="next()" class="btn btn-primary btn-sm">Proximo</button>
    `
  }
  if (page >= maxpage) {
    paginate = ` <button id="prev" onClick="prev()">Anterior</button>`
  }



  document.getElementById('paginate').innerHTML = paginate
}
getCharacters()


async function next() {
  const newPage = page === 0 ? 2 : page + 1
  window.location.hash = "#" + newPage
  window.location.reload()
}
function prev() {
  const newPage = page === 0 ? 2 : page - 1
  window.location.hash = "#" + newPage
  window.location.reload()
}
