function CreateTaskForm({
  title,
  setTitle,
  description,
  setDescription,
  createTask,
  setToast
}) {
  return (
    <div className="create-section">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          setToast(null)
        }}
      />

      <br /><br />

      <textarea
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createTask}>
        Create Task
      </button>
    </div>
  )
}

export default CreateTaskForm