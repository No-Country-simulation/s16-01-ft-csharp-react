using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly OrderlyDbContext _context;
        private readonly WebSocketService _webSocketService;

        public UsersController(OrderlyDbContext context, WebSocketService webSocketService)
        {
            _context = context;
            _webSocketService = webSocketService;
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

        [HttpPost("register")]
        public async Task<ActionResult<UserResponseDto>> Register([FromBody] RegisterUserDto registerUserDto)
        {
            if (registerUserDto == null || string.IsNullOrEmpty(registerUserDto.Token))
            {
                return BadRequest("Invalid token.");
            }

            // Search Session
            var session = await _context.Sessions
                .Include(s => s.Users)
                .FirstOrDefaultAsync(s => s.Token == registerUserDto.Token);

            // Add Waiter to Session
            var waiter = new Waiter
            {
                WaiterId = Guid.NewGuid().ToString(),
                WaiterName = GenerateWaiterName()
            };
            _context.Waiters.Add(waiter);
            await _context.SaveChangesAsync();

            // Create a New Session and Add a Waiter
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

            // Create a New User and Associate it with the Session
            var user = new User
            {
                UserId = Guid.NewGuid().ToString(),
                UserName = GenerateUserName(),
                Token = registerUserDto.Token,
                TableId = GenerateTableId(registerUserDto.Token),
                SessionId = session.SessionId // Assign the Session
            };

            _context.Users.Add(user);
            session.Users.Add(user); // Add the User to the Session
            await _context.SaveChangesAsync();

            // Create Response
            var response = new UserResponseDto
            {
                Token = user.Token,
                UserId = user.UserId,
                TableId = user.TableId
            };

            // Create WebSocket Message
            var message = new WebSocketMessage
            {
                Type = "UserRegistered",
                SessionId = session.SessionId,
                Data = new
                {
                    UserId = user.UserId,
                    UserName = user.UserName
                }
            };

            await _webSocketService.BroadcastMessageToSessionAsync(session.SessionId, message);
            return CreatedAtAction(nameof(Register), new { id = response.UserId }, response);
        }

        // Generate WaiterName
        private string GenerateWaiterName()
        {
            var randomNames = new List<string> { "Carlos", "Ana", "Luis", "Maria", "Jose" };
            var random = new Random();
            return randomNames[random.Next(randomNames.Count)];
        }

        // Generate UserName
        private string GenerateUserName()
        {
            return "User_" + Guid.NewGuid().ToString("N").Substring(0, 8);
        }

        // Generate TableId
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
