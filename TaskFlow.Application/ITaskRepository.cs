using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskFlow.Core;

namespace TaskFlow.Application
{
    public interface ITaskRepository
    {
        Task AddAsync(TaskItem task);
        Task<List<TaskItem>> GetAllAsync();
        Task<TaskItem?> GetByIdAsync(Guid id);
        Task UpdateAsync(TaskItem task);
        Task DeleteAsync(Guid id);
    }
}