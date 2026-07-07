function TaskCard({ task, updateStatus, deleteTask, getStatusText, setSelectedTask }) {

  const shortId = task.id.slice(0, 8)

  return (
    <div>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        <strong>Status:</strong> {getStatusText(task.status)}
      </p>

      <p>
        <strong>Short ID:</strong> {shortId}
      </p>

      <button onClick={() => setSelectedTask(task)}>
      View Details
      </button>

      <hr />
    </div>
  )
}

export default TaskCard