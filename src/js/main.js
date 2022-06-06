const pokedex = document.querySelector('.pokedex')

const getPokemon = (name, img, color) => {
  let divPoke = document.createElement('div')
  divPoke.className = `pokemon ${color}`
  divPoke.id = name
  divPoke.style.backgroundColor = color
  pokedex.appendChild(divPoke)

  let namePoke = document.createElement('p')
  namePoke.className = 'name-poke'
  namePoke.innerText = name
  divPoke.appendChild(namePoke)

  let imgPoke = document.createElement('img')
  imgPoke.className = 'img-poke'
  imgPoke.src = img
  divPoke.appendChild(imgPoke)
}

fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
.then(response => response.json())
.then(data => {

  Array.from(data.results).forEach(url => {
    fetch(url.url)
  .then(response => response.json())
  .then(data => {

    console.log(data.species.url)
    fetch(data.species.url)
      .then(response => response.json())
      .then(data2 => {
        getPokemon(data2.names[4].name, data.sprites.other["official-artwork"].front_default, data2.color.name)
      })
      .catch(err => {
        console.log(err)
      })
  })
  .catch(err => {
    console.log(err)
  })

  })
})



