// Configure controllers, EF Core with SQLite, and dependency injection for TaskFlow
using Microsoft.EntityFrameworkCore;
using TaskFlow.Infrastructure.Persistence;
using TaskFlow.Application;

var builder = WebApplication.CreateBuilder(args);

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins(
                    "http://localhost:5173",
                    "https://taskflow-ui-xi.vercel.app"
                );
        });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<TaskFlowDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<TaskService>();
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TaskFlowDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("ReactApp");
app.UseHttpsRedirection();
// Register global exception handling middleware
app.UseMiddleware<TaskFlow.API.Middleware.ExceptionHandlingMiddleware>();
app.MapControllers();
app.Run();