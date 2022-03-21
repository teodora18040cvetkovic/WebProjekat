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
    public class UmetnikController : ControllerBase
    {
        public GalerijaContext Context {get; set;}

        public UmetnikController(GalerijaContext context)
        {
            Context = context;
        }
        
       [Route("PreuzmiUmetnika/{idIzlozbe}")]
       [HttpGet]
       public async Task<ActionResult>PreuzmiUmetnika(int idIzlozbe){
           try{
               var umetnik = (await Context.Izlozbe.Where(p=>p.ID == idIzlozbe).Include(p=>p.Umetnici).FirstOrDefaultAsync()).Umetnici;
                return Ok(umetnik);
           }
            catch
            {
                return BadRequest("Nije ok");
            }
       }
      
        [Route("IzbrisiUmetnika/{idUmetnika}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiUmetnika(int idUmetnika)
        {
             if (idUmetnika <= 0)
            {
                return BadRequest("ID nije validan!");
            }
            try
            {
                var umetnik = await Context.Umetnici.FindAsync(idUmetnika);
               
                if(umetnik != null)
                {
                    Context.Umetnici.Remove(umetnik);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspešno izbrisan umetnik sa umetnickim imenom: {idUmetnika}");
                }
                else{
                     return BadRequest("Nije ok");
                }
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        

    }
}
