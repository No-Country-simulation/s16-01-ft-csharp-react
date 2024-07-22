using Microsoft.EntityFrameworkCore;
using OrderlyAPI.Entities;
using OrderlyAPI.Dtos;

namespace OrderlyAPI.Context
{
    public class OrderlyDbContext : DbContext
    {
        public OrderlyDbContext(DbContextOptions<OrderlyDbContext> options)
            : base(options) { }

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Items> Items { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Waiter> Waiters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Invoice>(tb =>
            {
                tb.HasKey(col => col.InvoiceId);
            });

            modelBuilder.Entity<Items>(tb =>
            {
                tb.HasKey(col => col.ItemId);
                tb.Property(col => col.ItemName).HasMaxLength(50);
                tb.Property(col => col.Description).HasMaxLength(200);
                //tb.Property(col => col.PrepTime).
            });

            modelBuilder.Entity<OrderItem>(tb =>
            {
                tb.HasKey(col => col.OrderItemId);
            });

            modelBuilder.Entity<Orders>(tb =>
            {
                tb.HasKey(col => col.OrderId);
            });

            modelBuilder.Entity<Session>(tb =>
            {
                tb.HasKey(col => col.SessionId);
                tb.Property(col => col.Token).IsRequired();
                tb.HasOne(col => col.Owner)
                  .WithMany()
                  .HasForeignKey(col => col.OwnerId)
                  .OnDelete(DeleteBehavior.Restrict);
                tb.HasMany(col => col.UsersRef)
                  .WithOne(col => col.SessionRef)
                  .HasForeignKey(col => col.SessionId)
                  .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Table>(tb =>
            {
                tb.HasKey(col => col.TableId);
            });

            modelBuilder.Entity<Users>(tb =>
            {
                tb.HasKey(col => col.UserId);
                tb.Property(col => col.UserId).HasMaxLength(20);
                tb.Property(col => col.UserName).HasMaxLength(20).IsRequired();
                tb.Property(col => col.Token).IsRequired().HasMaxLength(16);
                tb.HasIndex(col => col.Token).IsUnique();
                tb.HasOne(col => col.SessionRef)
                  .WithMany(col => col.UsersRef)
                  .HasForeignKey(col => col.SessionId)
                  .OnDelete(DeleteBehavior.Restrict);
            });
            
            modelBuilder.Entity<Waiter>(tb =>
            {
                tb.HasNoKey();
                tb.Property(col => col.WaiterName).HasMaxLength(20);
                //tb.Property(col => col.WaiterName)
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=orderlyapi.db");
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries<Users>().Where(e => e.State == EntityState.Added))
            {
                if (string.IsNullOrEmpty(entry.Entity.UserName))
                {
                    entry.Entity.UserName = GenerateUserName();
                }
            }

            return base.SaveChanges();
        }

        private string GenerateUserName()
        {
            return "User_" + Guid.NewGuid().ToString("N").Substring(0, 8);
        }
    }
}