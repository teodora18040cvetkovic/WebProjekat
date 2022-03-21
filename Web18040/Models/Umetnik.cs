using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Umetnik
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }
        [Required]
        [MaxLength(50)]
        public string UmenickoIme { get; set; }

        public List<Izlozba> Izlozbe { get; set; }
        public List<Slika> Slike { get; set; }

    }
}