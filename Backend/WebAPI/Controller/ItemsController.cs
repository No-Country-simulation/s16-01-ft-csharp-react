using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Controller
{
    [Route("api/menu")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly OrderlyDbContext _context;

        public ItemsController(OrderlyDbContext context)
        {
            _context = context;
        }
        [HttpGet("all")]
        public async Task<ActionResult<List<ListItemsDto>>> GetItems()
        {
            var items = await _context.Items.ToListAsync();

            return Ok(items);
        }
    }
}
