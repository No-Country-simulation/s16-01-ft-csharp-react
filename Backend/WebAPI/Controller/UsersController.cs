using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Controller
{
    [Route("api/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly OrderlyDbContext _context;

        public UsersController(OrderlyDbContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<ListsUserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            var usersDto = users.Select(user => new ListsUserDto
            {
                UserId = user.UserId,
                UserName = user.UserName,
                TableId = user.TableId,
                SessionId = user.SessionId,
                Token = user.Token
            }).ToList();

            return Ok(usersDto);
        }

        // Registrar un nuevo usuario y, si es necesario, crear o asociar una sesión existente
        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDto>> Register([FromBody] RegisterUserDto registerUserDto)
        {
            // Validación básica
            if (registerUserDto == null || string.IsNullOrEmpty(registerUserDto.Token))
            {
                return BadRequest("Invalid token.");
            }

            // Buscar una sesión existente con el mismo token
            var session = await _context.Sessions
                .Include(s => s.Users)
                .FirstOrDefaultAsync(s => s.Token == registerUserDto.Token);

            var waiter = new Waiter
            {
                WaiterId = Guid.NewGuid().ToString(),
                WaiterName = GenerateWaiterName()
            };
            _context.Waiters.Add(waiter);
            await _context.SaveChangesAsync();

            // Si no existe, crear una nueva sesión y asociar el mesero
            if (session == null)
            {
                session = new Session
                {
                    SessionId = Guid.NewGuid().ToString(),
                    Token = registerUserDto.Token,
                    WaiterId = waiter.WaiterId
                };
                _context.Sessions.Add(session);
                await _context.SaveChangesAsync();
            }

            // Crear el nuevo usuario y asignarlo a la sesión
            var user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                UserName = GenerateUserName(), // Generar nombre de usuario automáticamente
                Token = registerUserDto.Token,
                TableId = GenerateTableId(registerUserDto.Token),
                SessionId = session.SessionId // Asignar la sesión al usuario
            };

            _context.Users.Add(user);
            session.Users.Add(user); // Añadir el usuario a la sesión
            await _context.SaveChangesAsync();

            // Crear la respuesta
            var response = new UserResponseDto
            {
                Token = user.Token,
                UserId = user.UserId,
                TableId = user.TableId
            };

            return CreatedAtAction(nameof(Register), new { id = response.UserId }, response);
        }

        // Método auxiliar para generar un nombre de mesero
        private string GenerateWaiterName()
        {
            // Implementar lógica para generar nombres de mesero
            // Ejemplo sencillo:
            var randomNames = new List<string> { "Carlos", "Ana", "Luis", "Maria", "Jose" };
            var random = new Random();
            return randomNames[random.Next(randomNames.Count)];
        }

        // Método auxiliar para generar un nombre de usuario
        private string GenerateUserName()
        {
            return "User_" + Guid.NewGuid().ToString("N").Substring(0, 8);
        }

        // Método auxiliar para generar un TableId (Revisar por posible error)
        private string GenerateTableId(string token)
        {

            var session = _context.Sessions
                .Include(s => s.Users)
                .FirstOrDefaultAsync(s => s.Token == token)
                .Result;

            if (session == null)
            {
                throw new InvalidOperationException("Session not found.");
            }

            int hash = session.SessionId.GetHashCode();
            int tableId = (Math.Abs(hash) % 20) + 1;
            return tableId.ToString();
        }


    }
}