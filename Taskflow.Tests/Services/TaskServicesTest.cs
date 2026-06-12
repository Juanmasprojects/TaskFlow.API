//Moq unit test for TaskServices
using System;
using TaskFlow.Core;
using TaskFlow.Application;
using Moq;
using TaskStatus = TaskFlow.Core.TaskStatus;

namespace TaskFlow.Application.Tests
{
    public class TaskServiceTests
    {
        // Test for CreateTask_ShouldCreateTask
        [Fact]
        public async Task CreateTask_ShouldCreateTask()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<TaskItem>());
            var service = new TaskService(mockRepo.Object);

            // Act 
            await service.CreateTaskAsync("New Task", "Description");

            // Assert
            mockRepo.Verify(repo => repo.AddAsync(It.Is<TaskItem>(t => t.Title == "New Task" && t.Description == "Description")), Times.Once);
        }

        // Test for CreateTask_ShouldThrow_WhenTitleAlreadyExists
        [Fact]
        public async Task CreateTask_ShouldThrow_WhenTitleAlreadyExists()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var existingTask = new TaskItem { Title = "Existing Task" };
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<TaskItem> { existingTask });
            var service = new TaskService(mockRepo.Object);

            // Act & Assert
            await Assert.ThrowsAsync<DuplicateTaskTitleException>(() => service.CreateTaskAsync("Existing Task", "Description"));
        }

        // Test for DeleteTask_ShouldThrow_WhenTaskIsDone
        [Fact]
        public async Task DeleteTask_ShouldThrow_WhenTaskIsDone()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var doneTask = new TaskItem { Id = Guid.NewGuid(), Status = TaskStatus.Done };
            mockRepo.Setup(repo => repo.GetByIdAsync(doneTask.Id)).ReturnsAsync(doneTask);
            var service = new TaskService(mockRepo.Object);

            // Act & Assert
            await Assert.ThrowsAsync<InvalidTaskStateException>(() => service.DeleteTaskAsync(doneTask.Id));
        }

        // Test for DeleteTask_ShouldThrow_WhenTaskDoesNotExist
        [Fact]
        public async Task DeleteTask_ShouldThrow_WhenTaskDoesNotExist()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var nonExistentTaskId = Guid.NewGuid();
            mockRepo.Setup(repo => repo.GetByIdAsync(nonExistentTaskId)).ReturnsAsync((TaskItem?)null);
            var service = new TaskService(mockRepo.Object);

            // Act & Assert
            await Assert.ThrowsAsync<TaskNotFoundException>(() => service.DeleteTaskAsync(nonExistentTaskId));
        }

        // Text for SearchTasks_ShouldThrow_WhenSearchIsEmpty
        [Fact]
        public async Task SearchTasks_ShouldThrow_WhenSearchIsEmpty()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var service = new TaskService(mockRepo.Object);

            // Act & Assert
            await Assert.ThrowsAsync<ValidationException>(() => service.SearchTasksAsync(""));
        }

        // Test for SearchTasks_ShouldReturnMatchingTasks
        [Fact]
        public async Task SearchTasks_ShouldReturnMatchingTasks()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var matchingTask = new TaskItem { Title = "Matching Task" };
            var nonMatchingTask = new TaskItem { Title = "Random Task" };
            //use method getallasync to return a list of tasks, including the matching task
            mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<TaskItem> { matchingTask, nonMatchingTask });
            var service = new TaskService(mockRepo.Object);

            // Act
            var result = await service.SearchTasksAsync("Matching Task");

            // Assert
            Assert.Single(result);
            Assert.Equal("Matching Task", result[0].Title);
        }

        //Test for UpdateTask_ShouldUpdateTask
        [Fact]
        public async Task UpdateTask_ShouldUpdateTask()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var existingTask = new TaskItem { Id = Guid.NewGuid(), Title = "Existing Task", Description = "Old Description" };
            mockRepo.Setup(repo => repo.GetByIdAsync(existingTask.Id)).ReturnsAsync(existingTask);
            var service = new TaskService(mockRepo.Object);

            // Act
            await service.UpdateTaskAsync(existingTask.Id, "Updated Task", "Updated Description", TaskStatus.InProgress);

            // Assert
            mockRepo.Verify(repo => repo.UpdateAsync(It.Is<TaskItem>(t => t.Id == existingTask.Id && t.Title == "Updated Task" && t.Description == "Updated Description" && t.Status == TaskStatus.InProgress)), Times.Once);
        }

        //Text for UpdateTask_ShouldThrow_WhenTaskDoesNotExist
        [Fact]
        public async Task UpdateTask_ShouldThrow_WhenTaskDoesNotExist()
        {
            // Arrange
            var mockRepo = new Mock<ITaskRepository>();
            var nonExistentTaskId = Guid.NewGuid();
            mockRepo.Setup(repo => repo.GetByIdAsync(nonExistentTaskId)).ReturnsAsync((TaskItem?)null);
            var service = new TaskService(mockRepo.Object);

            // Act & Assert
            await Assert.ThrowsAsync<TaskNotFoundException>(() => service.UpdateTaskAsync(nonExistentTaskId, "Updated Task", "Updated Description", TaskStatus.InProgress));
        }

    }
}