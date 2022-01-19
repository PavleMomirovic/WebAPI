using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Organizacija
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [RegularExpression("\\d{8}")]
        public string MatBr { get; set;}

        [Required]
        public string Naziv { get; set; }

        [Required]
        [Range(1980,2050)]
        public int GodinaOtvaranja { get; set; }

        [Required]
        [MaxLength(200)]
        public string Opis{get; set;}

        public List<Projekat> Projekti { get; set; }

        [JsonIgnore]
        public List<Clanstvo> Clanovi { get; set; }

    }
}