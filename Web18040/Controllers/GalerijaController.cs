using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Web18040.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GalerijaController : ControllerBase
    {
         public GalerijaContext Context {get; set;}

        public GalerijaController(GalerijaContext context)
        {
            Context = context;
        }
        [Route("PreuzmiGalerije")]
        [HttpGet]
        public async Task<ActionResult> Pruzmi()
        {
            try
            {
                return Ok(await Context.Galerije.Select(p=> new { p.ID, p.NazivGalerije,p.Email,p.TipIzlozbe}).ToListAsync());
            }
            catch
            {
                return BadRequest("Nije ok");
            }
        }

        // [Route("DodajIzlozbuUGaleriju/{idGalerije}")]
        // [HttpPost]
        // public async Task<ActionResult> DodajIzlozbuUGaleriju([FromBody] Izlozba izlozba, int idGalerije){
        //     var gal = await Context.Galerije.FindAsync(idGalerije);

        //     if (string.IsNullOrWhiteSpace(izlozba.NazivIzlozbe) || izlozba.NazivIzlozbe.Length > 50)
        //     {
        //         return BadRequest("Unesite naziv izlozbe ne duzi od 50 karaktera!");
        //     }

        //     try
        //     {
        //         izlozba.Galerije = gal;
        //         Context.Izlozbe.Add(izlozba);
        //         await Context.SaveChangesAsync();
        //         int id = izlozba.ID;
        //         return Ok(id);
        //     }
        //     catch
        //     {
        //         return BadRequest("Nije ok");
        //     }
            
        // }

    }
}
