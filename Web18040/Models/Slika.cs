using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Slika
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength (50)]
        public string Naziv { get; set; }
        public DateTime DatumKreiranja { get; set; }
        
        [Required]
        public int Visina { get; set; }
        [Required]
        public int Sirina { get; set; }
        public Tehnika Tehnike { get; set; }
        [JsonIgnore]
        public  Izlozba Izlozbe {get; set;}
        public Umetnik Umetnici {get; set;}
    }
}