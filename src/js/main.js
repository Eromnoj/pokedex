const pokedex = document.querySelector('.pokedex')
const prevButton = document.querySelector('.previous')
const nextButton = document.querySelector('.next')
const search = document.querySelector('.searchinput')
const wait = document.querySelector('.wait')
const body = document.querySelector('body')
// https://pokeapi.co/api/v2/pokemon/?offset=0&limit=16
let apiAddress = new URL('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1200')

let nextAddress
let pokemonList = []

const displayPokemon = (name, img, color) => {
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

const fetchPokemon = (address) => {
  // pokedex.innerHTML = ""
  fetch(address)
    .then(response => response.json())
    .then(data => {

      Array.from(data.results).forEach(url => {

        nextAddress = data.next
        fetch(url.url)
          .then(response => response.json())
          .then(data => {

            fetch(data.species.url)
              .then(response => response.json())
              .then(data2 => {
                let newPokemon = {
                  name: data2.names[4].name,
                  img: data.sprites.other["official-artwork"].front_default,
                  color: data2.color.name
                }
                pokemonList.push(newPokemon)
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
}

fetchPokemon(apiAddress)


let begin = 0
let end = 20

setTimeout(() => {
  // wait.style.display = 'none'
  for (let i = begin; i < end; i++) {
    displayPokemon(pokemonList[i].name, pokemonList[i].img, pokemonList[i].color)
  }
}, 5000)

window.addEventListener('scroll', () => {
  // console.log(window.scrollY + ' ' + window.innerHeight + '= '+ (window.scrollY + window.innerHeight) + '  '+ pokedex.scrollHeight)
  if (window.scrollY + window.innerHeight >= pokedex.scrollHeight) {//condition pour infinite scroll : scrollY = état actuel du scroll
    begin += 20                                                     //                             innerHeight = partie visible du document
    end += 20                                                       //                            scrollHeight = la hauteur total de l'élément

    for (let i = begin; i < end; i++) {
      displayPokemon(pokemonList[i].name, pokemonList[i].img, pokemonList[i].color)
    }
  }
})


search.addEventListener('keyup', (e) => {
  pokedex.innerHTML = ''
  pokemonList.forEach(elem => {
    if (elem.name.toLowerCase().includes(search.value.toLowerCase())) {
      displayPokemon(elem.name, elem.img, elem.color)
    }
  })
  if (search.value === '') {
    pokedex.innerHTML = ''
    begin = 0
    end = 20
    // wait.style.display = 'none'
    for (let i = begin; i < end; i++) {
      displayPokemon(pokemonList[i].name, pokemonList[i].img, pokemonList[i].color)
    }
  }
})