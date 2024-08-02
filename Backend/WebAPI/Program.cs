using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.WebSockets;
using System.Text;
using WebAPI.Data;
using WebAPI.Models;
using WebAPI.Services;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddDbContext<OrderlyDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<WebSocketService>();

var app = builder.Build();

// Initialize the database with seed data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<OrderlyDbContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        // Log errors or handle them as needed
        Console.WriteLine($"An error occurred seeding the DB: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseWebSockets();

app.Use(async (context, next) =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        var webSocketService = context.RequestServices.GetRequiredService<WebSocketService>();
        await HandleWebSocketAsync(webSocketService, webSocket);
    }
    else
    {
        await next();
    }
});

app.MapControllers();

app.Run();

async Task HandleWebSocketAsync(WebSocketService webSocketService, WebSocket webSocket)
{
    var buffer = new byte[1024 * 4];
    WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

    string sessionId = null; // Variable para almacenar el sessionId cuando se une

    while (!result.CloseStatus.HasValue)
    {
        var messageString = Encoding.UTF8.GetString(buffer, 0, result.Count);
        var message = JsonConvert.DeserializeObject<WebSocketMessage>(messageString);

        if (message.Type == "JoinSession")
        {
            sessionId = message.SessionId;
            await webSocketService.AddSocketAsync(webSocket, sessionId);
        }

        // Forward message to all users in the same session
        if (sessionId != null)
        {
            await webSocketService.BroadcastMessageToSessionAsync(sessionId, message);
        }

        result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
    }

    if (sessionId != null)
    {
        await webSocketService.RemoveSocketAsync(sessionId, webSocket); // Asegúrate de pasar ambos parámetros
    }
    await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
}
