// Repository implementation using Entity Framework Core.
// Implements ITaskRepository.
// Uses TaskFlowDbContext to perform async CRUD operations.
// Methods: AddAsync, GetAllAsync, GetByIdAsync, UpdateAsync, DeleteAsync.
// All methods must use async/await and SaveChangesAsync where needed.
using System;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Core;
using TaskFlow.Application;

namespace TaskFlow.Infrastructure.Persistance

{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskFlowDbContext _context;

        public TaskRepository(TaskFlowDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(TaskItem task)
        {
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TaskItem>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskItem?> GetByIdAsync(Guid id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task UpdateAsync(TaskItem task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}