function CreateTaskForm({
  title,
  setTitle,
  description,
  setDescription,
  createTask,
  setToast
}) {
  return (
    <>
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

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={createTask}>
        Create Task
      </button>
    </>
  )
}

export default CreateTaskForm