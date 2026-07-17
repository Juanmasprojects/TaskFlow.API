import TaskCard from './TaskCard'
import TaskDetails from './TaskDetails'

function TaskList({
  tasks,
  selectedStatus,
  deleteTask,
  getStatusText,
  selectedTask,
  setSelectedTask,
  updateTask,
  setConfirmDialog,
  getStatusClass
}) {
  if (selectedTask) {
    return (
        <TaskDetails
          task={selectedTask}
          setSelectedTask={setSelectedTask}
          getStatusText={getStatusText}
          deleteTask={deleteTask}
          updateTask={updateTask}
          setConfirmDialog={setConfirmDialog}
          getStatusClass={getStatusClass}
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
            getStatusText={getStatusText}
            setSelectedTask={setSelectedTask}
            getStatusClass={getStatusClass}
          />
        ))}
    </>
     
  )
}

export default TaskList