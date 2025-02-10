const formKapsayici = document.querySelector(".form-kapsayici"); //class
const form = document.querySelector("#form"); //id
const aramaInput = document.querySelector("#aramaInput");
const buttonKapsayici = document.querySelector(".button-kapsayici");
const aramaButonu = document.querySelector("#aramaButonu");
const temizlemeButonu = document.querySelector("#temizlemeButonu");
const resimKapsayici = document.querySelector(".resim-kapsayici");


runEventListener();
function runEventListener(){ // eventleri çalıştırır
    form.addEventListener("submit" , search); // forma bir event ekle.Biri submit yaparsa search metoduna git.
    temizlemeButonu.addEventListener("click",clear);
}

function search(event){
    const yazilanDeger = aramaInput.value.trim();//trim : baştaki sondaki boşlukları kaldırır. 

    fetch(`https://api.unsplash.com/search/photos?query=${yazilanDeger}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID qq17VpOjF2mIbSsxV9JGZR6LxDekdTfGnGpNbMFEqpI"
        }
    })
    .then((res)=> res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image) => {
            addImageToUI(image.urls.small);
        })
    })
    .catch((err)=>console.log(err));

    event.preventDefault();

}


function clear(){
    aramaInput.value="";
    Array.from(resimKapsayici.children).forEach((child) => {
        child.remove(); //yada resimKapsayici.innerHtml=""; kullanılabilir.
    })
}

function addImageToUI(url){
    /*
    <div class="card">
        <img src="" alt="">
    </div>
    */
   console.log(resimKapsayici);
    const div = document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height='400';
    img.width='400';

    div.append(img);
    resimKapsayici.append(div);
}

 