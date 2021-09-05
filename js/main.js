const mask={
    maxmin(value){
        // Não aceita valores fora desse intervalo
        const min=1;
        const max=898;
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
// Fução que cria o card completo
function createCard(obj){
    const el = document.createElement("div")
    el.classList.add("card")
    el.style.background = color(obj.type);
    const block_a = createElBlockA(el)
    const block_b = createElBlockA(el)
    createElImg(block_a,obj.src)
    block_b.innerHTML=`<p class="p"><b>Nome:</b> ${obj.pokemon}</p>`
    block_b.innerHTML+=`<p class="p"><b>${obj.type.length>1?"tipos:":"tipo:"}</b> ${types(obj.type)}</p>`
    let skills="";
    obj.skills?obj.skills.forEach(e=>skills+='<span>'+e.ability.name+'</span>, '):skills=""
    skills = removeLastComma(skills)
    block_b.innerHTML+=`<p class="p"><b>Habilidades:</b>
    ${skills}
    </p>`
    obj.place.appendChild(el);
}
//---------------
// Cria cada elemento para o card dos pokemons
function createElBlockA(place){
    let el = document.createElement("div")
    el.classList.add("block-a")
    el.style.width="50%"
    place.appendChild(el)
    return el;
}
function createElBlockB(place){
    let el = document.createElement("div")
    el.classList.add("block-b")
    el.style.width="50%"
    place.appendChild(el)
    return el;
}
function createElImg(place,src){
    let el = document.createElement("img")
    el.src = src;
    place.appendChild(el)
    return el;
}
function types(types){
    let t="";
    types.forEach(type=>t+=`<span>${type.type.name}</span>, `)
    return removeLastComma(t);
}
function colorType(type){
    let color = "";
    switch(type){
        case"grass":
        color="rgb(45, 205, 69), "
        break;
        case"poison":
        color="rgb(136, 54, 136), "
        break
        case"fire":
        color="rgb(240, 128, 48)"
        break;
    }
    return color;
}
function removeLastComma(value){
    return value.replace(/[,][\s]{1}$/,"")
}
function color(types){
    let color="";
    if(types.length>1){
        let background=""
        types.forEach(type=>background+=colorType(type.type.name))
         background= removeLastComma(background)
        color=`linear-gradient(90deg,${background})`
    }else{
        color = colorType(types[0].type.name)
    }
    return color;
}
//----------------------------

document.querySelector("#searchCLick").addEventListener("click",e=>{
    const div = document.querySelector("#resul");
    const pokemonid = document.querySelector("#search").value
    createElImg(div,"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif")
    const ajax = new XMLHttpRequest();
    ajax.open("GET",`https://pokeapi.co/api/v2/pokemon/${pokemonid}`,true)
    ajax.send();

    ajax.onload=e=>{
        div.innerHTML=""
        const pokemon = JSON.parse(ajax.responseText);
        console.log(pokemon,pokemon.types[0].type.name)
        
        createCard({
            place:div, src:pokemon.sprites.front_default,
            pokemon:pokemon.name,type:pokemon.types,
            skills:pokemon.abilities
        })
    }
    ajax.onerror=err=>{
        console.log(err)
    }

})