import TaskCard from './TaskCard'
import TaskDetails from './TaskDetails'

function TaskList({
  tasks,
  selectedStatus,
  updateStatus,
  deleteTask,
  getStatusText,
  selectedTask,
  setSelectedTask
}) {
  if (selectedTask) {
    return (
        <TaskDetails
          task={selectedTask}
          setSelectedTask={setSelectedTask}
          getStatusText={getStatusText}
        />
    )
  }
  return (
    <>
    <h2>Task List</h2>
    {tasks
        .filter(task =>
          selectedStatus === "" ||
          task.status.toString() === selectedStatus
        )
        .map(task => (
          <TaskCard
            key={task.id}
            task={task}
            updateStatus={updateStatus}
            deleteTask={deleteTask}
            getStatusText={getStatusText}
            setSelectedTask={setSelectedTask}
          />
        ))}
    </>
     
  )
}

export default TaskList