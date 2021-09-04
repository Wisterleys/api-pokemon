const mask={
    maxmin(value){
        // Não aceita valores fora desse intervalo
        const min=1;
        const max=150;
        //--------------------------------------
        return value.replace(/(\D)/g,"")
        .replace(/(\d{1})/,num=>{return (num<min)?min:num})
        .replace(/\d{3}/,num=>{
            return num>max?max:num
        }).replace(/(\d{3})\d+?$/,'$1')
    }
}

document.querySelectorAll("input").forEach(e=> {
    e.addEventListener("input",$input=>{
        const camp=$input.target.dataset.mask
        $input.target.value= mask[camp]($input.target.value)
    })
});
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