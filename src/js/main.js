const pokedex = document.querySelector('.pokedex')
const prevButton = document.querySelector('.previous')
const nextButton = document.querySelector('.next')

let apiAddress = new URL('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=16')

let limit
let prevAddress
let nextAddress
let trigger = window.innerHeight
console.log(trigger)
const getPokemon = (name, img, color) => {
  let divPoke = document.createElement('div')
  divPoke.className = `pokemon ${color}`
  divPoke.id = name
  divPoke.style.backgroundColor = color
  pokedex.appendChild(divPoke)
  divPoke.style.opacity = 1
  let namePoke = document.createElement('p')
  namePoke.className = 'name-poke'
  namePoke.innerText = name
  divPoke.appendChild(namePoke)

  let imgPoke = document.createElement('img')
  imgPoke.className = 'img-poke'
  imgPoke.src = img
  divPoke.appendChild(imgPoke)
}

const fetchPokemon = (address) => {
  // pokedex.innerHTML = ""
  trigger = pokedex.scrollHeight
  fetch(address)
    .then(response => response.json())
    .then(data => {

      console.log(address)
      setTimeout(() => {
        Array.from(data.results).forEach(url => {

          nextAddress = data.next
          fetch(url.url)
            .then(response => response.json())
            .then(data => {

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
      }, 500)

    })
}

fetchPokemon(apiAddress)

window.addEventListener('scroll', () => {

  limit = window.scrollY
  console.log(limit)
  if (limit >= trigger) {
    fetchPokemon(nextAddress)
    console.log(limit, trigger)
  }
})