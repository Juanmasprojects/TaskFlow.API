//Base exception for abmbiguous short id
public class AmbiguousShortIdException : Exception
{
    public AmbiguousShortIdException(string shortId) : base($"Multiple tasks found with shortId {shortId}.")
    {
    }
}