//Base exception for task title already exists
public class DuplicateTaskTitleException : Exception 
{
    public DuplicateTaskTitleException(string title) : base($"Task with title {title} already exists.")
    {
    }   
}