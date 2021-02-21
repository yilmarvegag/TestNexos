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
    public class AuthorsController : ControllerBase
    {
        private readonly TestNexosContext _context;
        private readonly IDataRepository<Author> _repo;

        public AuthorsController(TestNexosContext context, IDataRepository<Author> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Authors
        [HttpGet("Index")]
        public IEnumerable<Author> Index()
        {
            return _context.Authors.OrderByDescending(p => p.Id);
        }

        // GET: api/Authors/5
        [HttpGet("FindById/{id}")]
        public async Task<IActionResult> FindById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var authors = await _context.Authors.FindAsync(id);

            if (authors == null)
            {
                return NotFound();
            }

            return Ok(authors);
        }

        // POST: api/PostAuthors
        [HttpPost("Create")]
        public async Task<Author> Create(Author authors)
        {
            try
            {
                authors.CreatedAt = DateTime.UtcNow;
                _context.Authors.Add(authors);
                await _context.SaveChangesAsync();
                return authors;
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/Authors/5
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Author authors)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != authors.Id)
            {
                return BadRequest();
            }

            _context.Entry(authors).State = EntityState.Modified;

            try
            {
                authors.UpdatedAt = DateTime.UtcNow;
                _repo.Update(authors);
                var save = await _repo.SaveAsync(authors);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(id))
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

        // DELETE: api/Authors/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var authors = await _context.Authors.FindAsync(id);
                if (authors == null)
                {
                    return NotFound();
                }

                _repo.Delete(authors);
                var save = await _repo.SaveAsync(authors);

                return Ok(authors);
            }
            catch (Exception ex)
            {
                return new JsonResult(new { message = ex.Message });
            }
        }

        private bool AuthorExists(int id)
        {
            return _context.Authors.Any(e => e.Id == id);
        }
    }
}
