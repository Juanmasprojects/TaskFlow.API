//create public Interface to save a list of tasks in the database
using TaskFlow.Core;

namespace TaskFlow.Application

{
    public interface ITaskRepository
{
    Task AddAsync(TaskItem task);
    Task<IEnumerable<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(Guid id);
}
}