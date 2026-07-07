function TaskDetails({ task, setSelectedTask, getStatusText }) {
  return (
    <div>

      <h2>Task Details</h2>

      <hr />

      <h3>{task.title}</h3>

      <p><strong>Description:</strong></p>  
      <p>{task.description}</p>

      <hr />
      
      <div className="task-section">
      <strong>ID</strong>
      <p>{task.id}</p>
      </div>

      <div className="task-section">
      <strong>Status</strong>
      <p>{getStatusText(task.status)}</p>
      </div>

      <div className="task-section">
      <strong>Created at</strong>
      <p>{task.createdAt}</p>
      </div>

      <hr />
      <button onClick={() => setSelectedTask(null)}>
        ← Back to List
      </button>

      <button onClick={() => setSelectedTask(null)}>
        Delete
      </button>

      <button onClick={() => setSelectedTask(null)}>
        Edit
      </button>

    </div>
  )
}

export default TaskDetails