// Middleware to globally handle unhandled exceptions
// and return a JSON error response.
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using TaskFlow.Application;

namespace TaskFlow.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var (statusCode, errorCode) = GetErrorResponse(exception);
            
            var response = new 
            { 
                errorCode = errorCode,
                message = exception.Message 
            };
            var payload = JsonSerializer.Serialize(response);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(payload);
        }

        private static (HttpStatusCode, string) GetErrorResponse(Exception exception)
        {
            return exception switch
            {
                ValidationException => (HttpStatusCode.BadRequest, "VALIDATION_ERROR"),
                DuplicateTaskTitleException => (HttpStatusCode.Conflict, "DUPLICATE_TITLE"),
                TaskNotFoundException => (HttpStatusCode.NotFound, "TASK_NOT_FOUND"),
                InvalidTaskStateException => (HttpStatusCode.BadRequest, "INVALID_STATE"),
                AmbiguousShortIdException => (HttpStatusCode.BadRequest, "AMBIGUOUS_ID"),
                _ => (HttpStatusCode.InternalServerError, "INTERNAL_SERVER_ERROR")
            };
        }
    }
}