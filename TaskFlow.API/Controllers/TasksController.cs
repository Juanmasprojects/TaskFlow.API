// API Controller for managing tasks.
// Uses TaskService.
// Includes endpoints to get all tasks and create a task.
// Follows REST conventions and uses async methods.
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application;
using TaskFlow.API.DTOs;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService)
    {
        _taskService = taskService;
    }  

    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _taskService.GetAllTasksAsync();
        return Ok(tasks);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest request)
    {
        var createdTask = await _taskService.CreateTaskAsync(request.Title, request.Description);
        return Ok(createdTask);
    }

}
