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
            //check if task with same title already exists
            var existingTasks = await _taskRepository.GetAllAsync();
            if (existingTasks.Any(t => t.Title.Trim().ToLower() == title.Trim().ToLower()))
                throw new InvalidOperationException("A task with the same title already exists.");
            
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
            // Use UpdateTaskStatusAsync for consistent status validation logic
            await UpdateTaskStatusAsync(taskId, status);

            await _taskRepository.UpdateAsync(task);
            
        }

        //update task,searched by shortID, reuse get task by shortID method
        public async Task UpdateTaskByShortIdAsync(string shortId, string title, string description, TaskStatus status)
        {
            var task = await GetTaskByShortIdAsync(shortId);
            await UpdateTaskAsync(task.Id, title, description, status);
        }

        // A task with status "Done" cannot be moved back to "To Do"
        public async Task UpdateTaskStatusAsync(Guid taskId, TaskStatus status)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);

            if (task == null) return;

            switch (status)
            {
                case TaskStatus.ToDo:
                    if (task.Status == TaskStatus.Done)
                        throw new InvalidOperationException("A task marked as Done cannot be moved back to To Do.");
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
            //check if task exists before deleting, if not throw exception
            var task = await _taskRepository.GetByIdAsync(taskId);
            if (task == null)
                throw new InvalidOperationException("Task does not exist.");
            //check that task is not donde before deleting, if done throw exception
            if (task.Status == TaskStatus.Done)
                throw new InvalidOperationException("Cannot delete a task that is marked as Done.");
            //delete tas
            await _taskRepository.DeleteAsync(taskId);
        }

        //delete task by shortID, reuse get task by shortID method, if task is done throw exception
        public async Task DeleteTaskByShortIdAsync(string shortId)
        {
            var task = await GetTaskByShortIdAsync(shortId);
            if (task.Status == TaskStatus.Done)
                throw new InvalidOperationException("Cannot delete a task that is marked as Done.");
            await DeleteTaskAsync(task.Id);
        }


        public async Task<TaskItem?> GetTaskByIdAsync(Guid taskId)
        {
            return await _taskRepository.GetByIdAsync(taskId);
        }

        //get task by shortID, 6 characters, trow exception if not found, if multiple tasks with same shortID throw exception
        public async Task<TaskItem> GetTaskByShortIdAsync(string shortId)
        {
            if (string.IsNullOrWhiteSpace(shortId) || shortId.Length < 6)
                throw new InvalidOperationException("Short ID must be at least 6 characters long.");

            var tasks = await _taskRepository.GetAllAsync();
            var matchingTasks = tasks.Where(t => t.Id.ToString().StartsWith(shortId, StringComparison.OrdinalIgnoreCase)).ToList();

            if (matchingTasks.Count == 0)
                throw new InvalidOperationException("No task found with the given short ID.");
            if (matchingTasks.Count > 1)
                throw new InvalidOperationException("Multiple tasks found with the same short ID. Please provide a longer ID.");

            return matchingTasks.First();
        }

        // Search tasks by title or description, return a list of matching tasks.
        // Search should be case-insensitive and match any part of the title or description.
        // t.Description can be null, so we need to check for that before searching in it.
        // If search string is empty or null, trow exception.
        // If search string is not found, return empty list.
        public async Task<List<TaskItem>> SearchTasksAsync(string search)
        {
            if (string.IsNullOrWhiteSpace(search))
                throw new ArgumentException("Search string cannot be empty.");

            var tasks = await _taskRepository.GetAllAsync();
            return tasks.Where(t =>
                t.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                (t.Description != null && t.Description.Contains(search, StringComparison.OrdinalIgnoreCase))
            ).ToList();
        }
    }
}
