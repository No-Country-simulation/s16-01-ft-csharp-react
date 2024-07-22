using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderlyAPI.Context;
using OrderlyAPI.Entities;
using OrderlyAPI.Dtos;
using System.Collections.Generic;
using System;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly OrderlyDbContext _context;

        public UsersController(OrderlyDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDTO>> Register([FromBody] RegisterUserDTO registerUserDto)
        {
            // Validación básica
            if (registerUserDto == null || string.IsNullOrEmpty(registerUserDto.SessionId) || string.IsNullOrEmpty(registerUserDto.Token))
            {
                return BadRequest("Invalid session ID or token.");
            }

            // Verificar si el SessionId existe
            var session = await _context.Sessions.FindAsync(registerUserDto.SessionId);
            if (session == null)
            {
                return NotFound("Session not found.");
            }

            // Verificar si el token ya existe
            if (await _context.Users.AnyAsync(u => u.Token == registerUserDto.Token))
            {
                return Conflict("Token already in use.");
            }

            // Crear el nuevo usuario
            var user = new Users
            {
                UserId = Guid.NewGuid().ToString(),
                UserName = GenerateUserName(), // Generar nombre de usuario automáticamente
                Token = registerUserDto.Token,
                TableId = GenerateTableId(),
                SessionId = registerUserDto.SessionId
            };

            _context.Users.Add(user);
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

        [HttpGet]
        public async Task<ActionResult<List<UserResponseDTO>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            var usersDto = users.Select(user => new UserResponseDTO
            {
                Token = user.Token,
                UserId = user.UserId,
                TableId = user.TableId
            }).ToList();

            return Ok(usersDto);
        }

        private string GenerateUserName()
        {
            // Generar un nombre de usuario predeterminado
            return "User_" + Guid.NewGuid().ToString("N").Substring(0, 8);
        }

        private string GenerateTableId()
        {
            // Generar un ID de tabla aleatorio entre 1 y 20
            var random = new Random();
            return random.Next(1, 21).ToString();
        }
    }
}

