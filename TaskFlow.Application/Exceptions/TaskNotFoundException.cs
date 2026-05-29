//Base exception for Task not found
public class TaskNotFoundException : Exception
{
    public TaskNotFoundException(Guid id) : base($"Task with id {id} not found.")
    {
    }

    public TaskNotFoundException(string shortId) : base($"Task with shortId {shortId} not found.")
    {
    }
}