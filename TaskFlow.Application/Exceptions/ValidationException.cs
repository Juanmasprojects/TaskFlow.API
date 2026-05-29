//Base exception for validation errors
public class ValidationException : Exception
{
    public ValidationException(string message) : base(message)
    {
    }
}