import TaskCard from './TaskCard'

function TaskList({
  tasks,
  selectedStatus,
  updateStatus,
  deleteTask,
  getStatusText
}) {
  return (
    <>
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
          />
        ))}
    </>
  )
}

export default TaskList