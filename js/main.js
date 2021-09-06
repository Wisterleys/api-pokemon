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
    el.dataset.src=JSON.stringify(obj.src)
    el.classList.add("card")
    el.style.background = color(obj.type);
    const block_a = createElBlockA(el)
    const block_b = createElBlockA(el)
    createElImg(block_a,obj.src.other["official-artwork"].front_default)
    block_b.innerHTML=`<p class="p"><b>Name<br></b> ${obj.pokemon}-${obj.code}</p>`
    block_b.innerHTML+=`<p class="p"><b>${obj.type.length>1?"Types":"Type"}</b><br> ${types(obj.type)}</p>`
    let skills="";
    obj.skills?obj.skills.forEach(e=>skills+='<span>'+e.ability.name+'</span>, '):skills=""
    skills = removeLastComma(skills)
    block_b.innerHTML+=`<p class="p"><b>${obj.skills.length>1?"Skills":"Skill"}</b><br>
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
        color="rgb(240, 128, 48), "
        break;
        case"flying":
        color="rgb(168, 144, 240), "
        break;
        case"water":
        color="rgb(20, 158, 255), "
        break;
        case"bug":
        color="rgb(168, 184, 32), "
        break
        case"normal":
        color="rgb(168, 168, 120), "
        break
        case"electric":
        color="rgb(248, 208, 48), "
        break
        case"ground":
        color="rgb(224, 192, 104), "
        break
        case"fairy":
        color="rgb(238, 153, 172), "
        break
        case"fighting":
        color="rgb(148, 53, 45), "
        break
        case"psychic":
        color="rgb(255, 105, 150), "
        break
        case"rock":
        color="rgb(184, 160, 56), "
        break
        case"steel":
        color="rgb(184, 184, 208), "
        break
        case"ice":
        color="rgb(152, 216, 216), "
        break
        case"ghost":
        color="rgb(97, 76, 131), "
        break
        case"dark":
        color="rgb(92, 72, 59), "
        break
        case"dragon":
        color="rgb(112, 10, 238), "
        break
    }
    return color;//.replace(/([\)])/,",.5$1");
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
        color = removeLastComma(colorType(types[0].type.name))
    }
    return color;
}
//----------------------------
function getPokemon(pokemonid){
    return new Promise((res,rec)=>{
            const div = document.querySelector("#resul");
            createElImg(div,"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif")
            const ajax = new XMLHttpRequest();
            ajax.open("GET",`https://pokeapi.co/api/v2/pokemon/${pokemonid}`,true)
            ajax.send();

            ajax.onload=e=>{
                res(ajax.responseText)
            }
            ajax.onerror=err=>{
                rec(err)
            }
        })
}
function clickInTheCard(){
    const cards = document.querySelectorAll(".card")
    if(cards.length>0){
        cards.forEach(card=>{
            card.addEventListener("click",function(){
                new Modal(document.body,this)
            })
        })
    }
}
function getOne(btn){
    btn.disabled=true
    const div = document.querySelector("#resul");
    const pokemonid = document.querySelector("#search").value
    if(pokemonid>0){
        createElImg(div,"https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif")
        getPokemon(pokemonid)
        .then(res=>{
            div.innerHTML=""
            const pokemon = JSON.parse(res);
            createCard({
                place:div, src:pokemon.sprites,
                pokemon:pokemon.name,type:pokemon.types,
                skills:pokemon.abilities,
                code:pokemon.id
            })
            btn.disabled=false
            clickInTheCard();
        })
        .catch(err=>console.log(err))
    }else{
        getAll(btn)
    }
}
function pages(place,data,i){
    /*
    <button id="page"></button>
    */
   const button = document.createElement("button");
   button.dataset.data = data
   button.classList.add("page");
   button.innerHTML=i
   place.appendChild(button)
}
function imp(tag=false){
    if(tag){
        
    }
}
function getAll(btn=false){
    btn?btn.disabled=true:0
    const pokemons=[];
    for (let index = 1; index < 899; index++) {
        pokemons.push(getPokemon(index))
        
    }
    Promise.all(pokemons)
    .then(res=>{
        const div = document.querySelector("#resul");
        div.innerHTML=""
        let count=1
        let page_count=1
        let data =[]
        res.forEach(pok=>{
            data.push(pok)
            if(count>8){
                pages(document.querySelector("#pages"),data,page_count)
                data=[]
                count=1
                page_count++
            }
            count++
        })
        btn?btn.disabled=false:0
        clickInTheCard();
    })
}
document.addEventListener("DOMContentLoaded",e=>{
    
    getAll(document.querySelector("#searchCLick"))
})
document.querySelector("#searchCLick").addEventListener("click",function(){
    getOne(this);

})
document.addEventListener("keydown",e=>{
    (e.key=="Enter")?getOne(document.querySelector("#searchCLick")):0
})
