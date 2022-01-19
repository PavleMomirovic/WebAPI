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
    public class VolonterController : ControllerBase
    {



        public NGOContext Context { get; set;}
        public VolonterController(NGOContext context)
        {
            Context=context;

        }



        [Route("DodajVolontera")]
        [HttpPost]
        public async Task<ActionResult> DodatiVolontera(string ime, string prezime, string jmbg, string godine, int pol, string organizacije)
        {
            if(jmbg.Length!=13)
            {
                return BadRequest("Los jmbg");
            }
            if(string.IsNullOrWhiteSpace(ime)|| ime.Length >50)
            {
                return BadRequest("Lose ime");
            }
            if(string.IsNullOrWhiteSpace(prezime)|| prezime.Length >50)
            {
                return BadRequest("Lose prezime");
            }

            int god =Int32.Parse(godine);

            try
            {
                Volonter v= new Volonter{
                    Ime=ime,
                    Prezime=prezime,
                    Godine=god,
                    JMBG=jmbg,
                    Pol= (Polovi)pol
                };
                Context.Volonteri.Add(v);

                var orgs =organizacije.Split('+').ToList();
                orgs.ForEach(el=>{
                    if(el==null) return;

                    var orgVal =Context.Organizacije.Where(p=>p.MatBr==el).FirstOrDefault();
                    
                    Clanstvo c = new Clanstvo{
                        Org= (Organizacija)orgVal,
                        Vol = v
                    }; 

                    Context.ClanoviOrganizacija.Add(c);

                });               

                await Context.SaveChangesAsync();



                return Ok($"Volonter je dodat, ID je: {v.Id}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("PromeniVolontera")]
        [HttpPut]
        public async Task<ActionResult> PromenitiVolontera(string jmbg,string ime,string prezime,string godine,int pol,string organizacije)
        {
            if(jmbg.Length!=13)
            {
                return BadRequest("Los jmbg");
            }
            if(string.IsNullOrWhiteSpace(ime)|| ime.Length >50)
            {
                return BadRequest("Lose ime");
            }
            if(string.IsNullOrWhiteSpace(prezime)|| prezime.Length >50)
            {
                return BadRequest("Lose prezime");
            }
            int god = Int32.Parse(godine);
            if(god<16||god>30)
            {
                return BadRequest("Godine moraju biti izmedju 16 i 30");
            }

            try
            {
                var volonter = Context.Volonteri.Where(p=> p.JMBG == jmbg).FirstOrDefault();
                
                if(volonter!= null)
                {
                    volonter.Ime=ime;
                    volonter.Prezime=prezime;
                    volonter.Godine=Int32.Parse(godine);
                    volonter.Pol=(Polovi)pol;

                    var orgs =organizacije.Split('+').ToList();


                    var tmp = await Context.ClanoviOrganizacija.Where(p=>p.Vol==volonter).ToListAsync();
                    tmp.ForEach(el=>{
                        Context.ClanoviOrganizacija.Remove(el);
                    });
                    
                    orgs.ForEach(el=>{
                        if(el==null) return;

                        var orgVal =Context.Organizacije.Where(p=>p.MatBr==el).FirstOrDefault();
                    
                        Clanstvo c = new Clanstvo{
                            Org= (Organizacija)orgVal,
                            Vol = volonter
                        }; 

                    Context.ClanoviOrganizacija.Add(c);

                });               


                    



                    await Context.SaveChangesAsync();
                    return Ok("Uspesno zamenjeni podaci");
                }
                else
                {
                return BadRequest("Nije pronadjen");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("PromenaFromBody")]
        [HttpPut]
        public async Task<ActionResult> PromeniBody([FromBody] Volonter volonter)
        {
            if(volonter.Id<=0)
            {
                return BadRequest("Ne postoji volonter sa tim ID-em");
            }
            if(volonter.JMBG.Length!=13)
            {
                return BadRequest("Los jmbg");
            }
            if(string.IsNullOrWhiteSpace(volonter.Ime)|| volonter.Ime.Length >50)
            {
                return BadRequest("Lose ime");
            }
            if(string.IsNullOrWhiteSpace(volonter.Prezime)|| volonter.Prezime.Length >50)
            {
                return BadRequest("Lose prezime");
            }

            try
            {
                var vol = await Context.Volonteri.FindAsync(volonter.Id);
                vol.JMBG=volonter.JMBG;
                vol.Ime=volonter.Ime;
                vol.Prezime=volonter.Prezime;

                //moze i sa Context.Volonteri.Update, ali ovo mi je lakse za trazenje gresaka

                await Context.SaveChangesAsync();
                return Ok("Volonter izmenjem kroz body");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("IzbrisiVolontera/{jmbg}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiStudenta(string jmbg)
        {
            if(jmbg==null)
            {
                return BadRequest("Pogresan ID");
            }

            try
            {
                var tmp = Context.Volonteri.Where(p=>p.JMBG==jmbg).FirstOrDefault();

                var id = tmp.Id;
                var vol = await Context.Volonteri.FindAsync(id);
                
                Context.Volonteri.Remove(vol);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisan volonter sa JMBG-om {jmbg}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
