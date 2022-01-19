using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Clanstvo
    {
        [Key]
        public int ID { get; set; }

        [Required]
        
        public Organizacija Org { get; set; }

        [Required]
        public Volonter Vol { get; set; }
    }
}