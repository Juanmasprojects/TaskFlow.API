// DTO used to update an existing task.
// Includes title, description and status.
using System.ComponentModel.DataAnnotations;
using TaskStatus = TaskFlow.Core.TaskStatus;

namespace TaskFlow.API.DTOs
{
    public class UpdateTaskRequest
    {

        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;

        public TaskStatus Status { get; set; }
    }  
}