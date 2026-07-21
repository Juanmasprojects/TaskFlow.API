import { useState } from "react"

function TaskDetails({ task, setSelectedTask, getStatusText, deleteTask, updateTask, setConfirmDialog, getStatusClass }) {

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedStatus, setEditedStatus] = useState(task.status)
  const [isSaving, setIsSaving] = useState(false)

  async function handleDelete() {
    await deleteTask(task.id)
    setSelectedTask(null)
  }

  return (
    <div className="task-details">
      <div className="task-section">
      <h2>Task Details</h2>

      <hr />

      <h3>
        {isEditing ? (
          <input
          className="title-input"
          disabled={isSaving}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          />
        )
        : task.title}
      </h3>

      <strong>Description</strong> 
      <p>
        {isEditing ? (
          <textarea
          className="description-input"
          disabled={isSaving}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
      <p className="description-text">{task.description}</p>
      )}
      </p>
      </div>
      <hr />
      
      <div className="task-section">
      <strong>ID</strong>
      <p className="task-id">{task.id}</p>
      </div>

      <div className="task-section">
      <strong>Status</strong>
      <div>
      {isEditing ? (
      <div>
        <select
          disabled={isSaving}
          value={editedStatus}
          onChange={(e) => setEditedStatus(Number(e.target.value))}
        >
          <option value={0}>To Do</option>
          <option value={1}>In Progress</option>
          <option value={2}>Done</option>
        </select>
      </div>
      ) : (
        <div className="status">
          <span
            className={`status-dot ${getStatusClass(task.status)}`}
           ></span>
          <span>{getStatusText(task.status)}</span>
        </div>
      )}
      </div>
      </div>  

      <div className="task-section">
      <strong>Created at</strong>
      <p className="task-date">{task.createdAt}</p>
      </div>

      <hr />
      {isEditing ? (
        <div>
          <button 
            disabled={isSaving}
            onClick={() => {
            setIsEditing(false)
            setEditedTitle(task.title)
            setEditedDescription(task.description)
            setEditedStatus(task.status)
          }}>
          Cancel
          </button>
          <button 
            disabled={isSaving ||
              (
              editedTitle === task.title &&
              editedDescription === task.description &&
              editedStatus === task.status
              )
            }
            onClick={async() => {
            setIsSaving(true)
            try {
              const taskToUpdate = {
                taskId: task.id,
                title: editedTitle,
                description: editedDescription,
                status: editedStatus
              }
            const updatedTask = await updateTask(taskToUpdate)
            setSelectedTask(updatedTask)
            setIsEditing(false)
            }
            finally {
            setIsSaving(false)
            }
          }}>
          {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <div>  
          <button onClick={() => setSelectedTask(null)}>
          ← Back to List
          </button>

          <button onClick={
            () => setConfirmDialog({
            title: "Delete Task",
            message: "Are you sure you want to delete task \"" + task.title + "\"?",
            onConfirm: async () => {
              await deleteTask(task.id)
              setSelectedTask(null)
            }
          })
          }>
          Delete
          </button>

          <button onClick={() => setIsEditing(true)}>
          Edit
          </button>
        </div>
      )
      }
      </div>
      )
}
  




export default TaskDetails