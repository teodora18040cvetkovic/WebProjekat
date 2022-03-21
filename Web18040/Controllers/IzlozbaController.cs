using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Web18040.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IzlozbaController : ControllerBase
    {
        public GalerijaContext Context {get; set;}

        public IzlozbaController(GalerijaContext context)
        {
            Context = context;
        }
        
        [Route("PreuzmiIzlozbe/{idGalerije}")]
        [HttpGet]
        public async Task<ActionResult> PruzmiIzlozbe(int idGalerije)
        {
            try
            {
                var izlozbe = (await Context.Galerije.Where(p=> p.ID == idGalerije).Include(p=>p.Izlozbe).FirstOrDefaultAsync()).Izlozbe;
                return Ok(izlozbe);
            }
            catch
            {
                return BadRequest("Nije ok");
            }
        }
    
        [Route("DodajIzlozbu/{idGalerija}/{ime}/{prezime}/{umIme}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj(int idGalerija,string ime,string prezime,string umIme,[FromBody] Izlozba izlozba)
        {
            var galerija = await Context.Galerije.FindAsync(idGalerija);
            if (string.IsNullOrWhiteSpace(izlozba.NazivIzlozbe) || izlozba.NazivIzlozbe.Length > 50)
            {
                return BadRequest("Unesite naziv izlozbe ne duzi od 50 karaktera!");
            }
            if (string.IsNullOrWhiteSpace(ime) || ime.Length > 50)
            {
                 return BadRequest("Unesite ime ne duze od 50 karaktera!");
            }
            if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50)
            {
                 return BadRequest("Unesite prezime ne duze od 50 karaktera!");
            }
            if (string.IsNullOrWhiteSpace(umIme) || umIme.Length > 50)
            {
                 return BadRequest("Unesite umetnicko ime ne duze od 50 karaktera!");
            }
            izlozba.Galerije=galerija;
            
            var izl = Context.Izlozbe.Where(p=>p.NazivIzlozbe == izlozba.NazivIzlozbe).FirstOrDefault();
            var im= Context.Umetnici.Where(p=> p.UmenickoIme==umIme).FirstOrDefault();
            
            if(im != null)
            {
                return StatusCode(203, "Postoji umetnik sa tim umetnickim imenom");
            }
            else if(izl != null)
            {
                return StatusCode(202, "Postoji izlozba sa tim imenom");
            }
            else
            {
                Umetnik um= new Umetnik();
                um.Ime=ime;
                um.Prezime=prezime;
                um.UmenickoIme=umIme;
                im = um;
                Context.Umetnici.Add(um);
            }
            
            izlozba.Umetnici=im;
            try
            {
                Context.Izlozbe.Add(izlozba);
                await Context.SaveChangesAsync();
 
                return Ok(new {Id = izlozba.ID});
            
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PromeniIzlozbu/{idIzlozbe}/{novnazivIzlozbe}/{novdatumOdrzavanja}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(int idIzlozbe,string novnazivIzlozbe, DateTime novdatumOdrzavanja)
        {
             if (string.IsNullOrWhiteSpace(novnazivIzlozbe) || novnazivIzlozbe.Length > 50)
            {
                return BadRequest("Unesite naziv izlozbe ne duzi od 50 karaktera!");
            }
            try
            {
                var izlozba = await Context.Izlozbe.FindAsync(idIzlozbe);

                if (izlozba != null)
                {
                    
                    izlozba.NazivIzlozbe = novnazivIzlozbe;
                    izlozba.DatumOdrzavanja = novdatumOdrzavanja;

                    await Context.SaveChangesAsync();
                    return Ok($"Uspešno promenjena izlozba! ID: {izlozba.ID}");
                }
                else
                {
                    return BadRequest("Izlozba nije pronađena!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiIzlozbu/{idIzlozbe}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int idIzlozbe)
        {
        
            if (idIzlozbe <= 0)
            {
                return BadRequest("ID nije validan!");
            }
            try
            {
                var izlozba = await Context.Izlozbe.FindAsync(idIzlozbe);
                if(izlozba == null)
                    return StatusCode(202, "Pogresan id");

                var slike = await Context.Slike.Where(p=>p.Izlozbe.ID == idIzlozbe).ToListAsync();
    
                if(slike.Count != 0)
                {
                    slike.ForEach(slika =>{
                        Context.Slike.Remove(slika);
                    });
                }
                Context.Izlozbe.Remove(izlozba);
                await Context.SaveChangesAsync();
                return Ok($"Uspešno izbrisana izlozba sa id: {idIzlozbe}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DatumZauzet/{datum}/{IdGalerija}")]
        [HttpGet]
        public async Task<ActionResult> Zauzet(DateTime datum, int idGalerija){
            try
            {
                var izlozba = await Context.Izlozbe.Where(p=>p.Galerije.ID == idGalerija && p.DatumOdrzavanja==datum).FirstOrDefaultAsync();
                if(izlozba != null)
                {
                    return StatusCode(202, "Datum zauzet");
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        

    }
}
