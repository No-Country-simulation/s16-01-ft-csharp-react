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
        public async Task<ActionResult<UserResponseDTO>> Register([FromBody] RegisterUserDTO registerUserDto)
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

            // Si no existe, crear una nueva sesión
            if (session == null)
            {
                session = new Session
                {
                    SessionId = Guid.NewGuid().ToString(),
                    Token = registerUserDto.Token
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
                TableId = GenerateTableId(),
                SessionId = session.SessionId // Asignar la sesión al usuario
            };

            _context.Users.Add(user);
            session.Users.Add(user); // Añadir el usuario a la sesión
            await _context.SaveChangesAsync();

            // Crear la respuesta
            var response = new UserResponseDTO
            {
                Token = user.Token,
                UserId = user.UserId,
                TableId = user.TableId
            };

            return CreatedAtAction(nameof(Register), new { id = response.UserId }, response);
        }


        // Método auxiliar para generar un nombre de usuario
        private string GenerateUserName()
        {
            return "User_" + Guid.NewGuid().ToString("N").Substring(0, 8);
        }

        // Método auxiliar para generar un TableId (Cambiar mas adelannte para que no sea aleatorio)
        private string GenerateTableId()
        {
            return new Random().Next(1, 21).ToString();
        }
    }
}