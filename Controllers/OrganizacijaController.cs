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

    public class OrganizacijaController: ControllerBase{

        public NGOContext Context { get; set;}
        public OrganizacijaController(NGOContext context)
        {
            Context=context;
        }

        [Route("PreuzmiOrganizacije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiOrganizacije()
        {
            await Task.Delay(1);
            var vol = Context.Organizacije.ToList();
            return Ok(vol);
        }


        





    }


}