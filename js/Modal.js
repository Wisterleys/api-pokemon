class Modal{
    constructor(place,card){
        this.place = place;
        this.card = card;
        this.loop;
        this.sprites=[];
        this.el = this.tamplate(this.place)
        this.mainLoop()
    }
    close(x){
        x.addEventListener("click",e=>{
            clearInterval(this.loop)
            this.sprites=[]
            this.el[0].remove()
        })
    }
    mainLoop(){
        let counter=0;
        const obj = JSON.parse(this.card.dataset.src)
        for(let key in obj){
            key!="other"&&key!="versions"?this.sprites.push(key):0
        }
        this.close(this.el[1])
        this.loop = setInterval(()=>{
            let v = obj[this.sprites[counter]]?true:false
            this.el[2].src=v?obj[this.sprites[counter]]:obj[this.sprites[4]]
            counter>this.sprites.length?counter=0:counter++
        },500)
    }
    tamplate(place){
        /* <div class="modal">
            <div class="close"><span>x</span></div>
            <img src="" alt="" id="centerimg">
        </div> */
        const el = document.createElement("div");
        el.classList.add("modal")
        const x = document.createElement("div");
        x.classList.add("close")
        const s = document.createElement("span");
        s.innerHTML="x"
        const img = document.createElement("img");
        img.id="centerimg";
        img.style.width="50%"
        x.appendChild(s)
        el.appendChild(x)
        el.appendChild(img)
        place.appendChild(el)
        return [el,x,img];
    }
}