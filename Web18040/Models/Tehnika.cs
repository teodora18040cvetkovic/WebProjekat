using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Tehnika
    {
        [Key]
        public int ID { get; set; }
 
        public string NazivTehnike { get; set; }
        [JsonIgnore]
        public List<Slika> Slike { get; set; }

    }
}