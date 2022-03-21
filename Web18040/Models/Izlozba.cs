using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Izlozba
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string NazivIzlozbe{ get; set; } 
        [Required]
        public DateTime DatumOdrzavanja { get; set; }
        public  List<Slika> Slike {get; set;}
        
        [JsonIgnore]
        public Galerija Galerije{get; set;}
        [JsonIgnore]
        public Umetnik Umetnici { get; set; }
    }
}