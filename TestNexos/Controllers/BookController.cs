using DataLayer;
using DataLayer.DTOs;
using DataLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testnexos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly TestNexosContext _context;
        private readonly IDataRepository<Book> _repo;

        public BookController(TestNexosContext context, IDataRepository<Book> repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet("Index")]
        public IEnumerable<Book> Index()
        {
            return _context.Books.Include(b=>b.Author).Include(b=>b.Publisher).OrderByDescending(p => p.Id);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Book book)
        {
            if (BookMaximunRegister(book.PublisherId))
            {
                throw new Exception("It is not possible to register the book, the maximum allowed has been reached.");
            }

            try
            {
                book.CreatedAt = DateTime.UtcNow;
                _repo.Add(book);
                var save = await _repo.SaveAsync(book);
                return new JsonResult(new { message = "Registered" });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }

        [HttpGet("FindById/{id}")]
        public async Task<Book> FindById(int id)
        {
            try
            {
                var book = await _context.Books.FindAsync(id);

                if (book == null)
                {
                    return null;
                }

                return book;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                book.UpdatedAt = DateTime.UtcNow;
                _repo.Update(book);
                var save = await _repo.SaveAsync(book);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    return NotFound();
                }

                _repo.Delete(book);
                var save = await _repo.SaveAsync(book);

                return Ok(book);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
        
        private bool BookMaximunRegister(int publisherId)
        {
            var maximunBook = _context.Publisher.Where(e => e.Id == publisherId).First().MaximumBooksRegistered;
            if (maximunBook.Equals("-1"))
            {
                return false;
            }
            else
            {
                if (maximunBook.Equals(_context.Books.Count(e => e.PublisherId == publisherId)))
                {
                    return true;
                }
                return false;
            }
        }
    }
}
