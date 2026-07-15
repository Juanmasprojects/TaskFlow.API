import { useState } from "react"

function TaskDetails({ task, setSelectedTask, getStatusText, deleteTask, updateTask, setConfirmDialog }) {

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
    <div>

      <h2>Task Details</h2>

      <hr />

      <h3>
        {isEditing ? (
          <input
          disabled={isSaving}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          />
        )
        : task.title}
      </h3>

      <p><strong>Description:</strong></p>  
      <p>
        {isEditing ? (
          <textarea
          disabled={isSaving}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
      <p>{task.description}</p>
      )}
      </p>
      <hr />
      
      <div className="task-section">
      <strong>ID</strong>
      <p>{task.id}</p>
      </div>

      <div className="task-section">
      <strong>Status</strong>
      {isEditing ? (
      <div>
        <select
          disabled={isSaving}
          value={editedStatus}
          onChange={(e) => setEditedStatus(Number(e.target.value))}
        >
          <option value={0}>Todo</option>
          <option value={1}>In Progress</option>
          <option value={2}>Done</option>
        </select>
      </div>
      ) : (
        <p>{getStatusText(task.status)}</p>
      )}
      </div>

      <div className="task-section">
      <strong>Created at</strong>
      <p>{task.createdAt}</p>
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