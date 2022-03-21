import { Galerija } from "./Galerija.js";

var listagalerija =[];
fetch("https://localhost:5001/Galerija/PreuzmiGalerije", {
    method: "GET"
}).then(p=>{
    p.json().then(galerije=>{
        galerije.forEach(galerija =>{
            var gal = new Galerija(galerija.id,galerija.nazivGalerije,galerija.email,galerija.tipIzlozbe);
            listagalerija.push(gal.nazivGalerije, gal.email,gal.tipIzlozbe);
            console.log(listagalerija);
            gal.crtajGaleriju(document.body);
        });
    })
       
})


