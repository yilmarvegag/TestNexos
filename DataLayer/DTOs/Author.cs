using System;
using System.Collections.Generic;
using System.Text;

namespace DataLayer.DTOs
{
    public class Author
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string DateOfBirth { get; set; }
        public string CityOfOrigin { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
