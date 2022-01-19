using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ProjektiController: ControllerBase{

        public NGOContext Context { get; set;}
        public ProjektiController(NGOContext context)
        {
            Context=context;
        }

        [Route("PreuzmiProjekte")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiProjekte(string matBr)
        {
            await Task.Delay(1);
            var vol = Context.Projekti.Where(p=>p.Organizacija.MatBr==matBr).ToList();
            return Ok(vol);
        }

    }
    
}