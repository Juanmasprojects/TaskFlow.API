function TaskCard({ task, updateStatus, deleteTask, getStatusText }) {
  return (
    <div>
      <h3>{task.title}</h3>

      <p>
        <strong>Description:</strong> {task.description}
      </p>

      <p>
        <strong>Status:</strong> {getStatusText(task.status)}
      </p>

      <select
        value={task.status}
        onChange={(e) => updateStatus(task, e.target.value)}
      >
        <option value="0">Todo</option>
        <option value="1">In Progress</option>
        <option value="2">Done</option>
      </select>

      <br /><br />

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>

      <hr />
    </div>
  )
}

export default TaskCard