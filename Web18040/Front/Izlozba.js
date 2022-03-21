import { Slika } from "./Slika.js";
import { Umetnik } from "./Umetnik.js";
import { Tehnika } from "./Tehnika.js";
import { Galerija } from "./Galerija.js";
export class Izlozba{
    constructor(id, nazivIzlozbe, datum)
    {
        this.id = id;
        this.nazivIzlozbe = nazivIzlozbe;
        this.datum = datum;
        this.slike = [];
        this.minikont = null;
    }
 
    dodajSlike(slika){
        this.slike.push(slika);
    }

    crtajIzlozbu(host)
    {
        this.minikont = document.createElement("div");
        host.appendChild(this.minikont);
        this.minikont.className = "divIzlozba2";
        const naslov = document.createElement("h4");
        naslov.innerHTML=this.nazivIzlozbe;
        naslov.className = "naslov";
        naslov.classList.add("naslov");
        this.minikont.appendChild(naslov);
        let nizLabela = ["Naziv:" , "Datum odrzavanja:"];
        let nizVrednostiIzmena=["nazivIzmena", "datumIzmena"];
        let nizVred = [this.nazivIzlozbe, this.datum];
        let labele = null;
        let miniDiv = null;
        nizLabela.forEach((element,index)=> {
            labele=document.createElement("labela");
            labele.className="labeleIzlozba";
            miniDiv=document.createElement("div");
            labele.innerHTML= element + " "+ nizVred[index];
            labele.classList.add(nizVrednostiIzmena[index]);
            miniDiv.appendChild(labele);
            this.minikont.appendChild(miniDiv);
        })

        const dugmeUpdate = document.createElement("button");
        dugmeUpdate.innerHTML = "Izmeni &#9998;";
        dugmeUpdate.className = "btn";
        this.minikont.appendChild(dugmeUpdate);
        dugmeUpdate.onclick=(ev)=>{
            divModal.style.display="block";
        }
        //za update
        const divModal = document.createElement("div");
        divModal.classList.add("modal");
        const divModalContent = document.createElement("div");
        divModalContent.className="modal-content";
        const span = document.createElement("span");
        span.className="close-btn";
        span.innerHTML="&times";
        span.onclick = (ev) => {
            divModal.style.display="none";
        }
        divModalContent.appendChild(span);
        divModal.appendChild(divModalContent);
        this.minikont.appendChild(divModal);
        
        let nizIzmena = ["Novi naziv izlozbe: ", "Novi datum odrzavanja: "];
        let trenutneVre = [this.nazivIzlozbe,this.datum];
        let kalseIzl = ["nazivIzlozbe", "datum"];
        let tipIzmena = ["text","date"];
        let inputIzmena = ["input", "input"];
        let labIznema = null;
        let poljaMod = null;
        nizIzmena.forEach((element, index)=>{
            labIznema=document.createElement("label");
            labIznema.innerHTML=element;
            labIznema.style.fontWeight = 900;
            poljaMod = document.createElement(inputIzmena[index]);
            poljaMod.type = tipIzmena[index];
            poljaMod.className=kalseIzl[index];
            poljaMod.value = trenutneVre[index];
            divModalContent.appendChild(labIznema);
            divModalContent.appendChild(poljaMod);
        })

        const sacuvajIzmenu = document.createElement("button");
        sacuvajIzmenu.innerHTML = "Sacuvaj izmenu";
        sacuvajIzmenu.className = "btn";
        divModalContent.appendChild(sacuvajIzmenu);
                        
        sacuvajIzmenu.onclick=(ev)=>{
            this.promeniIzlozbu();
            divModal.style.display="none";
        }

        const dugmeBrisanje = document.createElement("button");
        dugmeBrisanje.innerHTML = "Obrisi &#9746;";
        dugmeBrisanje.className = "btn";
       
        this.minikont.appendChild(dugmeBrisanje);
        dugmeBrisanje.onclick=(ev)=>{
            this.obrisiIzlozbu();
        }

        let umetnikkont=document.createElement("div");
        umetnikkont.classList.add("umetnikkont");
        
        const dugmePrikaziUmetnika = document.createElement("button");
        dugmePrikaziUmetnika.innerHTML = "Umetnik";
        dugmePrikaziUmetnika.className = "btn";
        this.minikont.appendChild(dugmePrikaziUmetnika);
        dugmePrikaziUmetnika.onclick=(ev)=>{
            this.obrisiDivcice(umetnikkont);
            this.prikaziUmetnika();
        }


        let slikakont=document.createElement("div");
        slikakont.classList.add("slikakont");
        slikakont.className = "slikakont";
        const dugmeSlika = document.createElement("button");
        dugmeSlika.innerHTML = "Slike";
        dugmeSlika.className = "btn";
        this.minikont.appendChild(dugmeSlika);
        dugmeSlika.onclick=(ev)=>{
            this.obrisiDivcice(slikakont);
            this.prikaziSlike();
        }

        const dugmeDodajSl = document.createElement("button");
        dugmeDodajSl.innerHTML = "Dodaj sliku";
        dugmeDodajSl.className = "btn";
        this.minikont.appendChild(dugmeDodajSl);
        dugmeDodajSl.onclick=(ev)=>{
            divModalSlika.style.display="block";
        }

        const divModalSlika =  document.createElement("div");
        divModalSlika.classList.add("modalSlika");
        const divModalSlikaContent = document.createElement("div");
        divModalSlikaContent.className="modal-content-slika";
        const spanSlika = document.createElement("span");
        spanSlika.className="close-btn";
        spanSlika.innerHTML="&times";
        spanSlika.onclick = (ev) => {
            divModalSlika.style.display="none";
        }
        divModalSlika.appendChild(divModalSlikaContent);
        divModalSlikaContent.appendChild(spanSlika);
        this.minikont.appendChild(divModalSlika);
        
        
        let nizSlika = ["Naziv slike: ", "Datum kreiranja: ","Dimenzije visina: ","Dimenzije sirina: "];
        let tipSlika = ["text", "date","number","number"];
        let inputSlika = ["input","input","input","input" ];
        let klase = ["nazivSlike", "datumKreiranja","visina", "sirina"];
        let labelaSlika = null;
        let divUnosSl = null;
        let inputSl = null;
        nizSlika.forEach((element,index)=>{
            divUnosSl = document.createElement("div");
            labelaSlika=document.createElement("label");
            labelaSlika.style.fontWeight = 900;
            inputSl = document.createElement(inputSlika[index]);
            labelaSlika.innerHTML = nizSlika[index];
            inputSl.className = klase[index];
            inputSl.type = tipSlika[index];
            divModalSlikaContent.appendChild(labelaSlika);
            divModalSlikaContent.appendChild(inputSl);
        })
         
        let labelaTehnika = document.createElement("label");
        labelaTehnika.innerHTML = "Tehnika: ";
        let cbbox = document.createElement("div");
        divModalSlikaContent.appendChild(labelaTehnika);
        divModalSlikaContent.appendChild(cbbox);

        let se = document.createElement("select");
        let op;

        var listatehnika =[];
        fetch("https://localhost:5001/Tehnika/PreuzmiTehniku")
                .then(p=>{
                p.json().then(tehnike=>{
                    tehnike.forEach(tehnika =>{
                    var g = new Tehnika(tehnika.id,tehnika.nazivTehnike);
                    listatehnika.push(g);
                });

                listatehnika.forEach(r => {
                    op = document.createElement("option");
                    op.innerHTML=r.nazivTehnike;
                    op.value=r.id;
                    op.name = r.nazivTehnike;
                    se.appendChild(op);

                    
                })
              
            })
            
        })
        divModalSlikaContent.appendChild(se); 
        const dugmedodajSliku = document.createElement("button");
        dugmedodajSliku.innerHTML = "Dodaj";
        dugmedodajSliku.className = "btn";
        divModalSlikaContent.appendChild(dugmedodajSliku);
        dugmedodajSliku.onclick=(ev)=>{
            this.dodajSliku();
            divModalSlika.style.display="none";
        }
       

        this.minikont.appendChild(umetnikkont);
        this.minikont.appendChild(slikakont);
    }

    prikaziUmetnika(){
        let umkont = this.minikont.querySelector(".umetnikkont");
        let um;
        fetch("https://localhost:5001/Umetnik/PreuzmiUmetnika/"+ this.id, {
            method: "GET"
        }).then(p=>p.json().then(umetnik =>
            {
                console.log(umetnik);
                um = new Umetnik(umetnik.id,umetnik.ime, umetnik.prezime, umetnik.umenickoIme);
                um.crtajUmetnika(umkont);

            })

        )
        
            
    }

    prikaziSlike(){
        let slkont = this.minikont.querySelector(".slikakont");
        fetch("https://localhost:5001/Slika/PreuzmiSlike/"+ this.id, {
            method: "GET"
        }).then(p=>p.json().then(slike =>
            slike.forEach((slika)=>{
                console.log(slika);
                const sl = new Slika(slika.id, slika.naziv,slika.datumKreiranja,slika.visina, slika.sirina, slika.nazivTehnike);
                sl.crtajSliku(slkont);
            }))
        )

    }

    promeniIzlozbu(){
        let noviNaziv = this.minikont.querySelector(".nazivIzlozbe").value;
        if(noviNaziv==="" || noviNaziv.length > 50)
        {
            alert("Unesite naziv izlozbe!");

            return;
        }

        let noviDatum = this.minikont.querySelector(".datum").value;
        
        if(noviDatum==="")
        {
            alert("Unesite datum!");
            return;
        }

        fetch("https://localhost:5001/Izlozba/PromeniIzlozbu/"+this.id+"/"+ noviNaziv +"/" + noviDatum, {
            method: "PUT",
            
        }).then(p => {
            if (p.ok) {
                alert("Uspesno promenjana izlozba!");
                this.nazivIzlozbe = noviNaziv;
                this.datum = noviDatum;
                this.minikont.querySelector(".naslov").innerHTML = this.nazivIzlozbe;
                this.minikont.querySelector(".nazivIzmena").innerHTML = "Naziv: "+ this.nazivIzlozbe;
                this.minikont.querySelector(".datumIzmena").innerHTML = "Datum odrzavanja: "+ this.datum;
                
            }
        });  
                
    }

    obrisiIzlozbu(){
        fetch("https://localhost:5001/Izlozba/IzbrisiIzlozbu/"+ this.id, {
            method: "DELETE"
        }).then(p=>{
            if(p.ok){
                this.minikont.style.display="none";
                alert("Izlozba obrisana");
            }
        });
    }


   dodajSliku(){
    
        let slkont = this.minikont.querySelector(".slikakont");
        let naziv = this.minikont.querySelector(".nazivSlike").value;
        if(naziv==="" || naziv.length > 50)
        {
            alert("Unesite naziv slike!");
            return;
        }
        let datumKreiranja = this.minikont.querySelector(".datumKreiranja").value;
        const today = new Date();
        var n = new Date(datumKreiranja);
        if(n >= today)
        {
            alert("Datum u buducnosti!");
            modSlika.style.display = "block";
            modSlikaC.style.display = "block";
            return;
        }
        if(datumKreiranja==="")
        {
            alert("Unesite datum!");
            return;
        }
        let visina = this.minikont.querySelector(".visina").value;
        if(visina==="" || visina.value < 50)
        {
            alert("Unesite visinu vecu od 50!");
            return;
        }
        let sirina = this.minikont.querySelector(".sirina").value;
        if(sirina==="" || sirina.value < 50)
        {
            alert("Unesite sirinu vecu od 50!");
            return;
        }
        let opEl = document.querySelector("select");
        var tehnikaV = opEl.options[opEl.selectedIndex].value;
        var teTekst = opEl.options[opEl.selectedIndex].name;
        
        console.log(naziv, datumKreiranja, visina, sirina, tehnikaV);
        console.log(this.id);
        
        fetch("https://localhost:5001/Slika/DodajSliku/"+ this.id + "/" + tehnikaV, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify({
                    "naziv": naziv,
                    "datumKreiranja": datumKreiranja,
                    "visina": visina,
                    "sirina": sirina
                    
                })
        }).then(p=>{
            if (p.ok){
                p.json().then(q => {
                    console.log(q);
                    alert("Uspesno dodata slika!");
                    let slika = new Slika(q,naziv,datumKreiranja,visina,sirina,teTekst);
                    this.dodajSlike(slika);
                    slika.crtajSliku(slkont);
                    console.log(this.slike);
                })
            }
         }).catch(p => {
             alert("Doslo je do greske prilikom upisa");
         });
        this.obrisiInf();
    }

    obrisiDivcice(parent){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    obrisiInf(){
        this.minikont.querySelector(".nazivSlike").value = "";
        this.minikont.querySelector(".visina").value = "";
        this.minikont.querySelector(".sirina").value = "";
        

    }
    
    
}
    


