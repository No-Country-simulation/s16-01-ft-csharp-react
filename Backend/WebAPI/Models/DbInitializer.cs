using WebAPI.Data;

namespace WebAPI.Models
{
    public static class DbInitializer
    {
        public static void Initialize(OrderlyDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Waiters.Any())
            {
                return; // DB has been seeded
            }

            var waiters = new Waiter[]
            {
            new Waiter { WaiterId = "1", WaiterName = "Ana" },
            new Waiter { WaiterId = "2", WaiterName = "Carlos" },
            new Waiter { WaiterId = "3", WaiterName = "Luis" },
            new Waiter { WaiterId = "4", WaiterName = "María" },
            new Waiter { WaiterId = "5", WaiterName = "Javier" },
            new Waiter { WaiterId = "6", WaiterName = "Claudia" },
            new Waiter { WaiterId = "7", WaiterName = "Ricardo" },
            new Waiter { WaiterId = "8", WaiterName = "Sofía" },
            new Waiter { WaiterId = "9", WaiterName = "Diego" },
            new Waiter { WaiterId = "10", WaiterName = "Lucía" }
            };

            foreach (Waiter w in waiters)
            {
                context.Waiters.Add(w);
            }
            context.SaveChanges();

            var tables = new Table[]
            {
            new Table { TableId = "1", TableNumber = "1", TableStatus = "Available", WaiterId = "1" },
            new Table { TableId = "2", TableNumber = "2", TableStatus = "Available", WaiterId = "2" },
                // Add more tables as necessary
            };

            foreach (Table t in tables)
            {
                context.Tables.Add(t);
            }
            context.SaveChanges();
        }
    }
}
