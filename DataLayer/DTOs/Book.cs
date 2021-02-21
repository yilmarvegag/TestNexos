using System;
using System.Collections.Generic;
using System.Text;

namespace DataLayer.DTOs
{
    public class Book
    {
		public int Id { get; set; }
		public string Year { get; set; }
		public string Title { get; set; }
		public string Gender { get; set; }
		public int NumberOfPages { get; set; }
		public int PublisherId { get; set; }
		public Publisher Publisher { get; set; }
		public int AuthorId { get; set; }
		public Author Author { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime UpdatedAt { get; set; }
	}
}
