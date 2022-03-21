using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Galerija
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string NazivGalerije{ get; set; } 

        [Required]
        [MaxLength(50)]
        public string TipIzlozbe { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public  List<Izlozba> Izlozbe {get; set;}

    }
}
