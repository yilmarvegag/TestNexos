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
    public class PublishersController : ControllerBase
    {
        private readonly TestNexosContext _context;
        private readonly IDataRepository<Publisher> _repo;

        public PublishersController(TestNexosContext context, IDataRepository<Publisher> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Publishers
        [HttpGet("Index")]
        public IEnumerable<Publisher> Index()
        {
            return _context.Publisher.OrderByDescending(p => p.Id);
        }

        // GET: api/Publishers/5
        [HttpGet("FindById/{id}")]
        public async Task<IActionResult> FindById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var publisher = await _context.Publisher.FindAsync(id);

            if (publisher == null)
            {
                return NotFound();
            }

            return Ok(publisher);
        }

        // POST: api/PostPublishers
        [HttpPost("Create")]
        public async Task<Publisher> Create(Publisher publisher)
        {
            try
            {
                publisher.CreatedAt = DateTime.UtcNow;
                _context.Publisher.Add(publisher);
                await _context.SaveChangesAsync();
                return publisher;
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/Publishers/5
        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != publisher.Id)
            {
                return BadRequest();
            }

            _context.Entry(publisher).State = EntityState.Modified;

            try
            {
                publisher.UpdatedAt = DateTime.UtcNow;
                _repo.Update(publisher);
                var save = await _repo.SaveAsync(publisher);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(id))
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

        // DELETE: api/Publishers/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var publisher = await _context.Publisher.FindAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            _repo.Delete(publisher);
            var save = await _repo.SaveAsync(publisher);

            return Ok(publisher);
        }

        private bool PublisherExists(int id)
        {
            return _context.Publisher.Any(e => e.Id == id);
        }
    }
}
