using System;
using System.Collections.Generic;
using System.Text;

namespace DataLayer.DTOs
{
    public class Publisher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CorrespondenceAddress { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public int MaximumBooksRegistered { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
