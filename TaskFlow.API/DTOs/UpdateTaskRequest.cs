// DTO used to update an existing task.
// Includes title, description and status.
using System.ComponentModel.DataAnnotations;
using TaskStatus = TaskFlow.Core.TaskStatus;

namespace TaskFlow.API.DTOs
{
    public class UpdateTaskRequest
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public TaskStatus Status { get; set; }
    }  
}