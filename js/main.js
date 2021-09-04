document.querySelector("#searchCLick").addEventListener("blur",e=>{
    const ajax = new XMLHttpRequest();
    ajax.open("GET","https://pokeapi.co/api/v2/pokemon/ditto",true)
    ajax.send();

    ajax.onload=e=>{
        console.log(ajax.responseText)
    }

})