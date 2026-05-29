//Base exception for invalit state transition
public class InvalidTaskStateException : Exception  
{
    public InvalidTaskStateException(string currentState, string newState) : base($"Cannot transition task from {currentState} to {newState}.")
    {
    }   

    //cannot delete task in state Done
    public InvalidTaskStateException(string currentState) : base($"Cannot delete task in state {currentState}.")
    {
    }
}