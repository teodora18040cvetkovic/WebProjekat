import { Tehnika } from "./Tehnika.js";
export class Slika{
    constructor(id, nazivSlike, datumKreiranja,visina,sirina, tehnike){
        this.id = id;
        this.nazivSlike = nazivSlike;
        this.visina = visina;
        this.sirina = sirina;
        this.datumKreiranja = datumKreiranja;
        this.tehnike = tehnike;
        this.miniKont = null;
        
    }

    crtajSliku(host){
        this.miniKont = document.createElement("div");
        host.appendChild(this.miniKont);
        

        const divSlika = document.createElement("div");
        divSlika.className ="divSlika";
        divSlika.classList.add("divSlika");
        

        let nizLabelaSlika = [" " , " ", " ", " ", " "];
        let klaseIzmena = ["nazivSlikeIzmena", "datumKreiranjaIzmena","visinaIzmena", "sirinaIzmena","tehnikeIzmena"];
        let nizVred = [this.nazivSlike, this.datumKreiranja,this.visina,this.sirina,this.tehnike];

        let labele = null;
        let div = null;

        nizLabelaSlika.forEach((element,index)=>{
            labele=document.createElement("labela");
            labele.className="labelaSlika";
            div = document.createElement("div");
            labele.innerHTML = nizVred[index] + "/";
            labele.classList.add(klaseIzmena[index]);
            div.appendChild(labele);
            divSlika.appendChild(div);
        })

        
        const dugmeObrisi = document.createElement("span");
        dugmeObrisi.className = "bi bi-x-square";
        dugmeObrisi.innerHTML ="  &#9746;";
        dugmeObrisi.addEventListener("mouseenter", function( event ) {
            event.target.style.color = "red";
            setTimeout(function() {
                event.target.style.color = "";
            }, 500);
        }, false);

        divSlika.appendChild(dugmeObrisi);
        this.miniKont.appendChild(divSlika);

        dugmeObrisi.onclick = (ev)=>{
            this.obrisiSliku();
        }

        const dugmeIzmeni = document.createElement("span");
        dugmeIzmeni.className = "bi bi-x-square";
        dugmeIzmeni.innerHTML ="  &#9998;";
        divSlika.appendChild(dugmeIzmeni);
        dugmeIzmeni.onclick = (ev)=>{
            divModalSlikaIzmena.style.display="block";
        }


        const divModalSlikaIzmena =  document.createElement("div");
        divModalSlikaIzmena.classList.add("modalSlikaIzmena");
        const divModalSlikaIzContent = document.createElement("div");
        divModalSlikaIzContent.className="modal-content-izmena";
        const spanSlikaIz = document.createElement("span");
        spanSlikaIz.className="close-btn";
        spanSlikaIz.innerHTML="&times";
        spanSlikaIz.onclick = (ev) => {
            divModalSlikaIzmena.style.display="none";
        }

        divModalSlikaIzmena.appendChild(divModalSlikaIzContent);
        divModalSlikaIzContent.appendChild(spanSlikaIz);
        this.miniKont.appendChild(divModalSlikaIzmena);
        
        let nizSlika = ["Novi naziv slike: ", "Novi datum kreiranja: ","Nove dimenzije visina: ","Nove dimenzije sirina: "];
        let trenutneVrednosti = [this.nazivSlike, this.datumKreiranja, this.visina, this.sirina];
        let tipSlika = ["text", "date","number","number"];
        let inputSlika = ["input","input","input","input" ];
        let klaseSlika = ["nazivSlike", "datumKreiranja","visina", "sirina", "tehnika"];
        let labelaSlika = null;
        let inputSl = null;
        nizSlika.forEach((element,index)=>{
            labelaSlika=document.createElement("label");
            inputSl = document.createElement(inputSlika[index]);
            labelaSlika.innerHTML = nizSlika[index];
            labelaSlika.style.fontWeight = 900;
            inputSl.className = klaseSlika[index];
            inputSl.type = tipSlika[index];
            inputSl.value = trenutneVrednosti[index];
            divModalSlikaIzContent.appendChild(labelaSlika);
            divModalSlikaIzContent.appendChild(inputSl);
        })

        let labelaTehnika = document.createElement("label");
        labelaTehnika.innerHTML = "Tehnika: ";
        let cbbox = document.createElement("div");
        divModalSlikaIzContent.appendChild(labelaTehnika);
        divModalSlikaIzContent.appendChild(cbbox);

        let se = document.createElement("select");
        se.className ="izmenaTeh";
        let op;
        var listica =[];
        fetch("https://localhost:5001/Tehnika/PreuzmiTehniku")
            .then(p=>{
            p.json().then(tehnike=>{
                tehnike.forEach(tehnika =>{
                var g = new Tehnika(tehnika.id,tehnika.nazivTehnike);
                listica.push(g);
            });

            listica.forEach(r => {
                    op = document.createElement("option");
                    op.innerHTML=r.nazivTehnike;
                    op.value=r.id;
                    op.name = r.nazivTehnike;
                    se.appendChild(op);

                    divModalSlikaIzContent.appendChild(se);

                
                })
                const dugmedodajSliku = document.createElement("button");
                dugmedodajSliku.innerHTML = "Sacuvaj izmene";
                dugmedodajSliku.className = "btn";
                divModalSlikaIzContent.appendChild(dugmedodajSliku);
                        
                dugmedodajSliku.onclick=(ev)=>{
                    this.izmeniSliku();
                    divModalSlikaIzmena.style.display="none";
                }
               
            })
        })
        
    }

    obrisiSliku(){
        fetch("https://localhost:5001/Slika/IzbrisiSliku/"+ this.id, {
            method:"DELETE"
        }).then(p=>{
            if(p.ok){
                alert("Slika obrisana!");
                this.miniKont.style.display="none";
            }
        })
    }

    izmeniSliku(){

        let noviNaziv = this.miniKont.querySelector(".nazivSlike").value;
        let noviDatum = this.miniKont.querySelector(".datumKreiranja").value;
        let novaVisina = this.miniKont.querySelector(".visina").value;
        let novaSirina = this.miniKont.querySelector(".sirina").value;

        let opEl = document.querySelector(".izmenaTeh");
        var novaTehnika = opEl.options[opEl.selectedIndex].value;
        var tekst = opEl.options[opEl.selectedIndex].name;
        console.log(tekst);
        fetch("https://localhost:5001/Slika/PromeniSliku/"+ this.id + "/" + noviNaziv + "/" + noviDatum + "/" + novaVisina + "/" + novaSirina + "/" + novaTehnika, {
            method:"PUT",
        }).then(p=>{
            if(p.ok){
                this.nazivSlike = noviNaziv;
                this.datumKreiranja = noviDatum;
                this.visina = novaVisina;
                this.sirina = novaSirina;
                this.tehnike = tekst;            
                console.log(this.tehnike);
                
                this.miniKont.querySelector(".nazivSlikeIzmena").innerHTML = this.nazivSlike + "/";
                this.miniKont.querySelector(".datumKreiranjaIzmena").innerHTML =  this.datumKreiranja + "/";
                this.miniKont.querySelector(".visinaIzmena").innerHTML =  this.visina + "/";
                this.miniKont.querySelector(".sirinaIzmena").innerHTML =  this.sirina + "/";
                this.miniKont.querySelector(".tehnikeIzmena").innerHTML = this.tehnike + "/";
            }

        })

        


    }

}