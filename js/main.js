function createElImg(place,name,src){
    let el = document.createElement(name)
    el.style.width="30%"
    el.src = src;
    place.appendChild(el);
}

document.querySelector("#searchCLick").addEventListener("click",e=>{
    const div = document.querySelector("#resul");
    const pokemonid = document.querySelector("#search").value
    createElImg(div,"img","https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif")
    const ajax = new XMLHttpRequest();
    ajax.open("GET",`https://pokeapi.co/api/v2/pokemon/${pokemonid}`,true)
    ajax.send();

    ajax.onload=e=>{
        div.innerHTML=""
        const pokemon = JSON.parse(ajax.responseText);
        pokemon.sprites.front_default
        pokemon.types[0].type.name
        createElImg(div,"img", pokemon.sprites.front_default)
    }
    ajax.onerror=err=>{
        console.log(err)
    }

})