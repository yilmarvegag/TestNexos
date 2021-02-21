using DataLayer.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DataLayer
{
    public class TestNexosContext : DbContext
    {
        public TestNexosContext(DbContextOptions<TestNexosContext> options)
        : base(options)
        {

        }

        public DbSet<Publisher> Publisher { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
    }
}
