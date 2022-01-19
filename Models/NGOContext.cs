using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class NGOContext : DbContext
    {
        public DbSet<Volonter> Volonteri { get; set; }
        public DbSet<Projekat> Projekti { get; set; }

        public DbSet<Organizacija> Organizacije { get; set; }

        public DbSet<Clanstvo> ClanoviOrganizacija { get; set; }




        public NGOContext(DbContextOptions opt): base(opt)
        {
            
        }

        // Komplikovane veze ovde: 
        //
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);

        //     modelBuilder.Entity<Predmet>()
        //     .HasOne<Spoj>()
        //     .WithOne(p=> p.Predmet);

        //     // Action a = new Action(p)
        //     //ovo ne znam sta je
        // }
    }
}