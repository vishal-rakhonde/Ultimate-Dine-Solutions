using Microsoft.EntityFrameworkCore;
using UltimateDineSolutions.Models;

namespace UltimateDineSolutions.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usermaster> Usermaster { get; set; }
        public DbSet<Employee> Employee { get; set; }
        //public DbSet<Order> Orders { get; set; }
        //public DbSet<FoodItem> FoodItems { get; set; }
        //public DbSet<OrderDetailsItem> OrderDetailsItems { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<OrderDetailsItem> OrderDetailsItems { get; set; }
        public DbSet<Payment> Payment { get; set; }
    }
}
