// API Controller for managing tasks.
// Uses TaskService.
// Includes endpoints to get all tasks and create a task.
// Follows REST conventions and uses async methods.
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application;
using TaskFlow.API.DTOs;
using TaskStatus = TaskFlow.Core.TaskStatus;


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
    public async Task<IActionResult> GetAllTasks([FromQuery] TaskStatus? status)
    {
        var tasks = await _taskService.GetAllTasksAsync(status);
        return Ok(tasks);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest request)
    {
        var createdTask = await _taskService.CreateTaskAsync(request.Title, request.Description);
        return Ok(createdTask);
    }

    // Delete a task by its id and return NoContent if successful.
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(Guid id)
    {
        await _taskService.DeleteTaskAsync(id);
        return NoContent();
    }

    // Create an endpoint to get a task by its id.
    // Return NotFound if the task does not exist.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTask(Guid id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    // Create an endpoint to get a task by shortId
    [HttpGet("short/{shortId}")]
    public async Task<IActionResult> GetTaskByShortId(string shortId)
    {
        var task = await _taskService.GetTaskByShortIdAsync(shortId);
        return Ok(task);
    }

    // Create and endpoint to delete a task by shorId  
    [HttpDelete("short/{shortId}")]
    public async Task<IActionResult> DeleteTaskByShortId(string shortId)
    {
        await _taskService.DeleteTaskByShortIdAsync(shortId);
        return NoContent();
    }

    // Create a PUT endpoint to update a task by id.
    // Return NotFound if task does not exist.
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(Guid id, [FromBody] UpdateTaskRequest request)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        await _taskService.UpdateTaskAsync(id, request.Title, request.Description, request.Status);
        return Ok(task);
    }
    // Create a PUT endpoint to update a task by id.
    // Return NotFound if task does not exist.
    [HttpPut("short/{shortId}")]   
    public async Task<IActionResult> UpdateTaskByShortId(string shortId, [FromBody] UpdateTaskRequest request)
    {
        var task = await _taskService.GetTaskByShortIdAsync(shortId);
        if (task == null)
        {
            return NotFound();
        }
        await _taskService.UpdateTaskByShortIdAsync(shortId, request.Title, request.Description, request.Status);
        return Ok(task);
    } 

 }
