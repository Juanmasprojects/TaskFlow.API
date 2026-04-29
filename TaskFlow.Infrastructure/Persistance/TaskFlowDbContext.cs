// DbContext for TaskFlow using Entity Framework Core.
// It should include a DbSet<TaskItem> and inherit from DbContext.
// Configure it using constructor with DbContextOptions.
using Microsoft.EntityFrameworkCore;
using TaskFlow.Core;

namespace TaskFlow.Infrastructure.Persistance

{
    public class TaskFlowDbContext : DbContext
    {
        public TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }
    }
}