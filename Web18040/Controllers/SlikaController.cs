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
    public class SlikaController : ControllerBase
    {
        public GalerijaContext Context {get; set;}

        public SlikaController(GalerijaContext context)
        {
            Context = context;
        }
        
        [Route("PreuzmiSlike/{idIzlozbe}")]
        [HttpGet]
        public async Task<ActionResult>PreuzmiSlike(int idIzlozbe){
            try
            {
                var slika = await Context.Slike.Where(p=>p.Izlozbe.ID==idIzlozbe).Include(p=>p.Tehnike).ToListAsync();
                return Ok(slika.Select(p=> new {p.ID,p.Naziv,p.DatumKreiranja,p.Visina,p.Sirina,p.Tehnike.NazivTehnike}).ToList());
            }
            catch
            {
                return BadRequest("Nije ok");
            }
        }
        [Route("DodajSliku/{idIzlozbe}/{idTehn}")]
        [HttpPost]
        public async Task<ActionResult> DodajSliku([FromBody] Slika slika, int idIzlozbe,int idTehn)
        {
            if (string.IsNullOrWhiteSpace(slika.Naziv) || slika.Naziv.Length > 50)
            {
                return BadRequest("Unesite naziv slike ne duzi od 50 karaktera!");
            }
            if(slika.Visina < 50)
            {
                return BadRequest("Unesite visinu slike vecu od 50!");
            }
            if(slika.Sirina < 50)
            {
                return BadRequest("Unesite sirinu slike vecu od 50!");
            }
            var izl = await Context.Izlozbe.FindAsync(idIzlozbe);
            var teh = await Context.Tehnike.FindAsync(idTehn);
      
            slika.Izlozbe = izl;
            slika.Tehnike = teh;
            try
            {
                Context.Slike.Add(slika);
                await Context.SaveChangesAsync();
                return Ok(slika.ID);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PromeniSliku/{idSlike}/{naziv}/{datumKreiranja}/{visina}/{sirina}/{idTehn}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(int idSlike,string naziv,DateTime datumKreiranja, int visina, int sirina, int idTehn)
        {
            var slika = Context.Slike.Where(p => p.ID == idSlike).Include(p=>p.Tehnike).FirstOrDefault();
            try
            {
                var tehn = await Context.Tehnike.FindAsync(idTehn);
                if (slika != null)
                {
                    slika.Naziv = naziv;
                    slika.DatumKreiranja = datumKreiranja;
                    slika.Visina = visina;
                    slika.Sirina = sirina;
                    slika.Tehnike = tehn; 
                    await Context.SaveChangesAsync();
                    return Ok(slika);
                }
                else
                {
                    return BadRequest("Slika nije pronađena!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiSliku/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID nije validan!");
            }
            try
            {
                var slika = await Context.Slike.FindAsync(id);
                Context.Slike.Remove(slika);
                await Context.SaveChangesAsync();
                return Ok($"Uspešno izbrisana slika sa id: {id}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
