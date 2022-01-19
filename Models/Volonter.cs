using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public enum Polovi{
        Muski=1,
        Zenski=2,
    }

    [Table("Volonter")]
    public class Volonter
    {


        [Key]
        public int Id { get; set; }
        
        [Required]
        [RegularExpression("\\d{13}")]
        public string JMBG { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }

        [Required]
        [Range(15,30)] // kategorija mladih
        public int Godine { get; set; }

        [Required]
        public Polovi Pol{get; set;}

        [JsonIgnore]
        public List<Clanstvo> Organizacije { get; set; }

    }

}