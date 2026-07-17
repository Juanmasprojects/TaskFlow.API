function TaskCard({ task, getStatusText, setSelectedTask, getStatusClass }) {

  const shortId = task.id.slice(0, 8)

  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p className="task-description">{task.description}</p>

      <div className="status">
        <span
         className={`status-dot ${getStatusClass(task.status)}`}
        ></span>
        <span>{getStatusText(task.status)}</span>
      </div>

      <p className="short-id">
        <strong>Short ID:</strong> {shortId}
      </p>

      <button onClick={() => setSelectedTask(task)}>
      View Details
      </button>
    </div>
  )
}

export default TaskCard