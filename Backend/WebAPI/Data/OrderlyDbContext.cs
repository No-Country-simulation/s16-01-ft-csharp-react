using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class OrderlyDbContext : DbContext
    {
        public OrderlyDbContext(DbContextOptions<OrderlyDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Waiter> Waiters { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Table>()
                .HasOne(w => w.Waiter)
                .WithMany(w => w.Tables)
                .HasForeignKey(t => t.WaiterId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Item)
                .WithMany(i => i.OrderItems)
                .HasForeignKey(oi => oi.ItemId);
            
            modelBuilder.Entity<Item>()
                .HasMany(i => i.OrderItems)
                .WithOne(oi => oi.Item)
                .HasForeignKey(oi => oi.ItemId);

            modelBuilder.Entity<Session>()
                .HasOne(s => s.Waiter)
                .WithMany(w => w.Sessions)
                .HasForeignKey(s => s.WaiterId);modelBuilder.Entity<Item>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
