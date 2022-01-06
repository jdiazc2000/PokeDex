//Pokémon Variables//
const pokemonContenedor = document.querySelector(".poke-contenedor");
const anterior = document.querySelector("#anterior");
const siguiente = document.querySelector("#siguiente");
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.getElementById('nombrepokemon');
const btnbusc = document.getElementById('btnbusc');
const btnborr = document.getElementById('btnborr');
const btnindx = document.getElementById('volverIndex');
const appNode = document.getElementById('poke-contenedor');

//Buttons//
btnbusc.addEventListener('click', insertarPokemon);
btnborr.addEventListener('click', borrarPokemon);

//Offset = Valor minimo de lista, limir = valor del limite de la lista //
let offset = 1;
limit = 8;


//Pokémon Funciones
async function fetchPokemon(id) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => {
            createPokemon(data);
        })
}

async function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        await fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    card.classList.add('grow');

    const spriteContenedor = document.createElement('div');
    spriteContenedor.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.setAttribute('alt', 'pokemonIMG');
    sprite.src = pokemon.sprites.front_default

    spriteContenedor.appendChild(sprite);

    //* Nombre y ID
    const name = document.createElement('h2');
    name.classList.add('name');
    name.textContent = pokemon.name

    const number = document.createElement('h2');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    number.classList.add('mostrarId');


    card.appendChild(spriteContenedor);
    card.appendChild(name);
    card.appendChild(number);

    pokemonContenedor.appendChild(card);
}


function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
fetchPokemons(offset, limit);


/* BUSCAR POKÉMON */
function insertarPokemon() {
    window.fetch(`${baseUrl}${pokemon.value.toLowerCase()}`)
        .then(response => {
            if (response.status === 404 || pokemon.value == 0) {
                Swal.fire(
                    'Error :(',
                    'El nombre o el ID ingresando no se encontró, por favor inténtelo de nuevo.',
                    'error'
                )
            } else {
                document.getElementById('poke-contenedor-index').style.display = 'none'
                document.getElementById('container-portada').style.backgroundImage = "url(../Pokedex/Imagenes/Buscar.webp"
                document.getElementById('anterior').style.display = 'none'
                document.getElementById('siguiente').style.display = 'none'
                document.getElementById('btnborr').style.display = 'inline'
                document.getElementById('volverIndex').style.display = 'inline'
                document.getElementById('poke-contenedor').style.display = 'grid'
                return response.json();
            }
        })
        .then(responseJSON => {
            const allItems = []
            const resultado = []

            for (let pokemonInfo in responseJSON) {
                resultado.push(pokemonInfo, responseJSON[pokemonInfo]);
            }
            
            console.table(resultado);


            //* Cargar carta
            const card = document.createElement('div');
            card.classList.add('pokemon-block');
            card.classList.add('grow');

            //* Cargar Contenedor
            const spriteContenedor = document.createElement('div');
            spriteContenedor.classList.add('img-container');

            //* Cargar Imagen
            const pokemonImagen = document.createElement('img')
            pokemonImagen.src = resultado[29].front_default
            spriteContenedor.appendChild(pokemonImagen)

            //* Datos
            const pokemonNombre = document.createElement('h2')
            pokemonNombre.innerText = `#${resultado[13]} 
            Nombre: ${resultado[21]}`
            spriteContenedor.appendChild(pokemonNombre)

            const pokemonTipo = document.createElement('h2')
            pokemonTipo.innerText = `Tipo: ${resultado[33][0].type.name}`
            spriteContenedor.appendChild(pokemonTipo)


            const pokemonVida = document.createElement('h2')
            pokemonVida.innerText = `Vida: ${resultado[31][0].base_stat}`
            spriteContenedor.appendChild(pokemonVida)

            const pokemonHabilidad = document.createElement('h2')
            pokemonHabilidad.innerText = `Habilidad: ${resultado[1][0].ability.name}`
            spriteContenedor.appendChild(pokemonHabilidad)

            //* Contenedor
            const contenedor = document.createElement('div')
            allItems.push(contenedor)


            card.appendChild(spriteContenedor);
            card.appendChild(pokemonImagen);
            card.appendChild(pokemonNombre);
            card.appendChild(pokemonTipo);
            card.appendChild(pokemonVida);
            card.appendChild(pokemonHabilidad);

            
            contenedor.appendChild(card);
            appNode.append(...allItems)
        })
}


//Mostrar resultado de busqueda de pokemones a traves resultado ingresado en el formulario//
function mostrarIndex(){
    document.getElementById('poke-contenedor-index').style.display = 'grid'
    document.getElementById('anterior').style.display = 'inline'
    document.getElementById('siguiente').style.display = 'inline'
    document.getElementById('btnborr').style.display = 'none'
    document.getElementById('volverIndex').style.display = 'none'
    document.getElementById('poke-contenedor').style.display = 'none'
    document.getElementById('container-portada').style.backgroundImage = "url(../Pokedex/Imagenes/Portada.webp"
    borrarPokemon();
    document.getElementById("nav-menu").className = "nav-menu";
    

//Ocultar boton Anterior
    if(offset == 1){
        document.getElementById('anterior').style.display = 'none';
    }
}


//Mostrar busqueda de pokemones//
function mostrarBuscador(){
    document.getElementById('poke-contenedor-index').style.display = 'none'
    document.getElementById('container-portada').style.backgroundImage = "url(../Pokedex/Imagenes/Buscar.webp"
    document.getElementById('anterior').style.display = 'none'
    document.getElementById('siguiente').style.display = 'none'
    document.getElementById('btnborr').style.display = 'inline'
    document.getElementById('volverIndex').style.display = 'inline'
    document.getElementById('poke-contenedor').style.display = 'grid'
    document.getElementById("nav-menu").className = "nav-menu";
}

//Boton anterior//
anterior.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContenedor);
        fetchPokemons(offset, limit);     
    }

//Si el index es 1, oculta el boton = Anterior//
    if(offset == 1){
        document.getElementById('anterior').style.display = 'none';
    }
})

//Boton siguiente//
siguiente.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContenedor);
    fetchPokemons(offset, limit);
    document.getElementById('anterior').style.display = 'inline'
})


//Borrar pokemones buscados
function borrarPokemon() {
    let todosPokemones = appNode.childNodes //* Lista de nodos
    todosPokemones = Array.from(todosPokemones) //* Array

    todosPokemones.forEach(pokemon => {
        pokemon.remove(pokemon);
    })
}