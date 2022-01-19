using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ClanstvoController: ControllerBase{

        public NGOContext Context { get; set;}
        public ClanstvoController(NGOContext context)
        {
            Context=context;
        }

        [Route("PreuzmiVolontereOrganizacije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiVolontereOrganizacije(string matBr){

            var vol = await Context.ClanoviOrganizacija.Where(p=>p.Org.MatBr==matBr).Include(p=>p.Vol).ToListAsync();
            

            return Ok(vol);
        }

        [Route("PreuzmiOrganizacijeVolontera/{jmbg}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiVolontera(string jmbg)
        {
            if(jmbg==null)
            {
                return BadRequest("Doslo je do greske prilikom upisa id-a");
            }

            var tmp =  await Context.ClanoviOrganizacija.Where(p=>p.Vol.JMBG==jmbg).Include(p=>p.Org).ToListAsync();

            

            return Ok(tmp);
        }

        // [Route("Dodaj volontera u organizacije")]
        // [HttpGet]
        // public async Task<ActionResult> DodajClanaOrganizacijama(string matBrojevi,string jmbg)
        // {
        //     if(matBrojevi==null)
        //     {
        //         return BadRequest("Doslo je do greske prilikom upisa. Volonter mora biti clan barem jedne organizacije kako bi bio u bazi.");
        //     }
        //     if(jmbg==null){
        //         return BadRequest("Doslo je do nepredvidjene greske");
        //     }
        //     return Ok(tmp);
        // }





    }
    
}