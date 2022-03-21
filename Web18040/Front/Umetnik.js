export class Umetnik{
    constructor(id, ime, prezime, umetnickoIme){
        this.id=id;
        this.ime = ime;
        this.prezime = prezime;
        this.umetnickoIme = umetnickoIme;
        this.minkont = null;
    }

    crtajUmetnika(host){
        this.minkont = document.createElement("div");
        host.appendChild(this.minkont);

        const divUmetnik = document.createElement("div");
        divUmetnik.classList.add("divUmetnik");
        let labelaUmetnik = document.createElement("label");
        labelaUmetnik.className = "labelaUmetnik";
        labelaUmetnik.innerHTML= this.ime + " " + this.prezime + "("+ this.umetnickoIme+")";
        this.minkont.appendChild(divUmetnik);
        divUmetnik.appendChild(labelaUmetnik);
        
    }
    
}