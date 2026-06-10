import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")


//////////// FUNCTIONS ////////////
   function getStatusText(status) {
    switch (status) {
      case 0:
        return "Todo"
      case 1:
        return "In Progress"
      case 2:
        return "Done"
      default:
        return "Unknown"
    }
  }

async function loadTasks() {
  try {
    const response = await fetch('http://localhost:5144/api/tasks')
    const data = await response.json()

    setTasks(data)
  }
  catch (error) {
    console.error(error)
  }
}

async function createTask() {
  try {
    const response = await fetch('http://localhost:5144/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create task')
    }

    setTitle("")
    setDescription("")

    await loadTasks()
  }
  catch (error) {
    console.error(error)
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(
      `http://localhost:5144/api/tasks/${id}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete task')
    }

    await loadTasks()
  }
  catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  loadTasks()
}, [])


//////////// UI ////////////
return (
  <div>
    <h1>TaskFlow</h1>
    <button onClick={loadTasks}>
     Refresh Tasks
    </button>
    <p>Total tasks: {tasks.length}</p>

    <select
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
  > 
  <option value="">All</option>
  <option value="0">Todo</option>
  <option value="1">In Progress</option>
  <option value="2">Done</option>
  </select>

    <hr />
    <h2>Create Task</h2>

<input
  type="text"
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
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
<hr />
    {tasks
    .filter(task =>
    selectedStatus === "" ||
    task.status.toString() === selectedStatus
    )
    .map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>

        <p>
          <strong>Description:</strong> {task.description}
        </p>

        <p>
          <strong>Status:</strong> {getStatusText(task.status)}
        </p>

        <button onClick={() => deleteTask(task.id)}>
        Delete
        </button>
        <hr />
      </div>
    ))}
  </div>
)

}

export default App