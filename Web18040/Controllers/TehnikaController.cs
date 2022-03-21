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
    public class TehnikaController : ControllerBase
    {
        public GalerijaContext Context {get; set;}

        public TehnikaController(GalerijaContext context)
        {
            Context = context;
        }
        [Route("PreuzmiTehniku")]
        [HttpGet]
        public async Task<ActionResult> Pruzmi()
        {
            try
            {
                return Ok(await Context.Tehnike.Select(p=> new { p.ID, p.NazivTehnike}).ToListAsync());
            }
            catch
            {
                return BadRequest("Nije ok");
            }
        }
    }
}
