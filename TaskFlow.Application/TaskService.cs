// Service to manage tasks: create, get all, update status and delete tasks
using TaskStatus = TaskFlow.Core.TaskStatus;
using TaskFlow.Core;

namespace TaskFlow.Application
{
    public class TaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskItem> CreateTaskAsync(string title, string description)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty.");

            var task = new TaskItem
            {
                Title = title,
                Description = description
            };

            await _taskRepository.AddAsync(task);
            return task;
        }

        // Return all tasks or filter by status if provided.
        public async Task<List<TaskItem>> GetAllTasksAsync(TaskStatus? status = null)
        {
            var tasks = await _taskRepository.GetAllAsync();
            if (status.HasValue)
            {
                tasks = tasks.Where(t => t.Status == status).ToList();
            }
            
            return tasks;
        } 

        public async Task UpdateTaskAsync(Guid taskId, string title, string description, TaskStatus status)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);

            if (task == null) return;

            task.Title = title;
            task.Description = description;
            task.Status = status;

            await _taskRepository.UpdateAsync(task);
        }

        public async Task UpdateTaskStatusAsync(Guid taskId, TaskStatus status)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);

            if (task == null) return;

            switch (status)
            {
                case TaskStatus.ToDo:
                    task.Status = TaskStatus.ToDo;
                    break;
                case TaskStatus.InProgress:
                    task.MarkInProgress();
                    break;
                case TaskStatus.Done:
                    task.MarkDone();
                    break;
            }

            await _taskRepository.UpdateAsync(task);
        }

        public async Task DeleteTaskAsync(Guid taskId)
        {
            await _taskRepository.DeleteAsync(taskId);
        }

        public async Task<TaskItem?> GetTaskByIdAsync(Guid taskId)
        {
            return await _taskRepository.GetByIdAsync(taskId);
        }
    }
}