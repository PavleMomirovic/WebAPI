using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Projekat
    {
        
        [Key]
        public int ID { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [MaxLength(200)]
        public string Opis { get; set; }

        [Required]
        public bool Aktivan { get; set; }

        public Organizacija Organizacija { get; set; }
        
    }
}