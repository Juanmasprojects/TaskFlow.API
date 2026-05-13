// DTO used when creating a new task through the API.
// Contains title and description fields.
using System.ComponentModel.DataAnnotations;

namespace TaskFlow.API.DTOs
{
    // Add validation attributes for title and description.
    // Title is required and max length 100.
    public class CreateTaskRequest
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }  = string.Empty;
        
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;
    }
}