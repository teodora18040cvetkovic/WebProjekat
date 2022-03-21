import {Izlozba} from "./Izlozba.js";
import {Umetnik} from "./Umetnik.js";
import { Tehnika } from "./Tehnika.js";
export class Galerija{
    constructor(id,nazivGalerije,email,tipIzlozbe){
        this.id = id;
        this.nazivGalerije = nazivGalerije;
        this.email = email;
        this.tipIzlozbe = tipIzlozbe;
        this.izlozbe=[];
        this.kontGalerija = null;
       
    }
    dodajIzlozbe(izlozba){
        this.izlozbe.push(izlozba);
    }
    crtajGaleriju(host){
        this.kontGalerija = document.createElement("div");
        this.kontGalerija.className="kontGalerija";
        host.appendChild(this.kontGalerija);

        const divForma = document.createElement("div");
        divForma.className = "divForma";
        this.kontGalerija.appendChild(divForma);

        const divTabele = document.createElement("div");
        divTabele.className = "divTabele";
        this.kontGalerija.appendChild(divTabele);
        

        const infoGalerija = document.createElement("div");
        infoGalerija.className = "info";
        divForma.appendChild(infoGalerija);

        let nizLabelaGal =["","Email: ","Tip izlozbe:"];
        let nizVrednosti =[this.nazivGalerije,this.email,this.tipIzlozbe];
        let poml = null;
        let pomd = null;
        nizLabelaGal.forEach((element,index)=>{
            poml = document.createElement("label");
            poml.className = "labeleGalerija";
            pomd = document.createElement("div");
            poml.innerHTML = element+nizVrednosti[index];
            pomd.appendChild(poml);
            infoGalerija.appendChild(pomd);
        })

        const dugmeVratiIzlozbe = document.createElement("button");
        dugmeVratiIzlozbe.innerHTML = "Prikazi izlozbe";
        dugmeVratiIzlozbe.className = "btn";

        dugmeVratiIzlozbe.onclick=(ev)=>{
            this.vratiSveIzlozbe();
        }
        infoGalerija.appendChild(dugmeVratiIzlozbe);
        
        //forma za izlozbu
        const divIzlozba = document.createElement("div");
        divIzlozba.className = "divIzlozba";
        divForma.appendChild(divIzlozba);
        const naslovIzlozba = document.createElement("label");
        naslovIzlozba.className="naslov";
        naslovIzlozba.innerHTML = "Dodaj izlozbu: "
        divIzlozba.appendChild(naslovIzlozba);
        let nizLabelaIzl = ["Naziv:" , "Datum odrzavanja:"];
        let tip = ["text", "date"];
        let klaseIzll = ["nazivIzlozbe","datumOdrzavanja"];
        let inputIzll = ["input" , "input"];
        let labIzlozba=null;
        let divUnos = null;
        let unos = null;
        nizLabelaIzl.forEach((element, index)=>{
            labIzlozba=document.createElement("label");
            labIzlozba.innerHTML=element;
            divUnos=document.createElement("div");
            unos = document.createElement(inputIzll[index]);
            unos.className = klaseIzll[index];
            unos.type=tip[index];
            divUnos.appendChild(labIzlozba);
            divUnos.appendChild(unos);
            divIzlozba.appendChild(divUnos);
        })

        //umetnik
        let naslovUmetnik = document.createElement("label");
        naslovUmetnik.className="naslov";
        naslovUmetnik.innerHTML = "Dodaj umetika: "
        divIzlozba.appendChild(naslovUmetnik);
        let nizLabelaUmetnik = ["Ime:" , "Prezime:", "Umetnicko ime:"];
        let klaseUm = ["ime","prezime","umetnickoIme"];
        let tipUm = ["text", "text", "text"];
        let inputUm = ["input","input","input"];
        let labUmetnik=null;
        let divUnosUmetnik = null;
        let unosUmetnik = null;
        nizLabelaUmetnik.forEach((element, index)=>{
            labUmetnik=document.createElement("label");
            divUnosUmetnik=document.createElement("div");
            labUmetnik.innerHTML=element;
            unosUmetnik = document.createElement(inputUm[index]);
            unosUmetnik.className = klaseUm[index];
            unosUmetnik.type=tipUm[index];
            divUnosUmetnik.appendChild(labUmetnik);
            divUnosUmetnik.appendChild(unosUmetnik);
            
            divIzlozba.appendChild(divUnosUmetnik);
        })
        const dugmeDodajUmetnika = document.createElement("button");
        dugmeDodajUmetnika.innerHTML = "Dodaj";
        dugmeDodajUmetnika.className = "btn";

        dugmeDodajUmetnika.onclick=(ev)=>{
            this.dodajIzlozbu();
        }
        divIzlozba.appendChild(dugmeDodajUmetnika);

    }

    dodajIzlozbu(){

        

        let nazivIzlozbe = this.kontGalerija.querySelector(".nazivIzlozbe").value;

        if(nazivIzlozbe==="" || nazivIzlozbe.length > 50)
        {
            alert("Unesite naziv izlozbe!");
            return;
        }

        let datumOdrzavanjaV = this.kontGalerija.querySelector(".datumOdrzavanja").value;
        const today = new Date();
        var n = new Date(datumOdrzavanjaV);
        if(n <= today)
        {
            alert("Izaberite datum koji sledi.");
            return;
        }
        if(datumOdrzavanjaV==="")
        {
            alert("Unesite datum!");
            return;
        }

        let ime = this.kontGalerija.querySelector(".ime").value;
        
        if(ime==="" || ime.length > 50)
        {
            alert("Unesite ime");
            return;
        }
       
        let prezime = this.kontGalerija.querySelector(".prezime").value;

        if(prezime==="" || prezime.length > 50)
        {
            alert("Unesite prezime");
            return;
        }

        let umetnickoIme = this.kontGalerija.querySelector(".umetnickoIme").value;

        if(umetnickoIme==="" || umetnickoIme.length > 50)
        {
            alert("Unesite umetnicko ime!");
            return;
        }
        
        fetch("https://localhost:5001/Izlozba/DatumZauzet/"+ datumOdrzavanjaV + "/" + this.id,{
            method: "GET"
        }).then(q=>{
            if(q.status == 200)
            {
                fetch("https://localhost:5001/Izlozba/DodajIzlozbu/"+ this.id + "/" + ime + "/" + prezime + "/" + umetnickoIme,
                    { 
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                            body: JSON.stringify({
                                "nazivIzlozbe": nazivIzlozbe,
                                "datumOdrzavanja": datumOdrzavanjaV

                            })
                    }).then(q=>{

                    if (q.status == 200){
                        q.json().then(q=>{
                            console.log(q.id);
                            alert("Uspesno dodata izlozba!");
                            let izl = new Izlozba(q.id,nazivIzlozbe,datumOdrzavanjaV);
                            izl.Galerija=this;
                            this.dodajIzlozbe(izl);
                            izl.crtajIzlozbu(divD);
                        })
                        
                    }
                    else if(q.status == 202)
                    {
                        alert("Postoji izlozba sa istim imenom.");
                    }
                    else if(q.status == 203)
                    {
                        alert("Postoji umetnik sa istim umetnickim imenom.");
                    }
                    else
                    {
                        alert("Fuuu");
                    }
                }).catch(p => {
                    alert("Doslo je do greske prilikom upisa1");
                });
        
        }
        else if(q.status == 202)
        {
            alert("Datum zauzet");
        }
        else
        {
            alert("Fuuu");
        }
        }).catch(p => {
            alert("Doslo je do greske prilikom upisa");
        });
        const divD = this.kontGalerija.querySelector(".divTabele");
    }

    vratiSveIzlozbe(){
        
        let divIzlozbe = this.kontGalerija.querySelector(".divTabele");
        this.obrisiDivcice(divIzlozbe);
        fetch("https://localhost:5001/Izlozba/PreuzmiIzlozbe/"+ this.id, {
            method: "GET"
        }).then(p=>p.json().then(izlozbe =>
            izlozbe.forEach((izlozba) => {
                const izl = new Izlozba(izlozba.id, izlozba.nazivIzlozbe,izlozba.datumOdrzavanja);
                izl.crtajIzlozbu(divIzlozbe);
            }))
            );
    }

    obrisiDivcice(parent){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}
    