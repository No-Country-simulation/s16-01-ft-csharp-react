using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderlyAPI.Context;
using OrderlyAPI.Dtos;

namespace OrderlyAPI.Controllers
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

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<List<ItemsListDTO>>> GetItemsList()
        {
            var ItemList = await _context.Items.ToListAsync();
            return Ok(ItemList);
        }
    }
}
