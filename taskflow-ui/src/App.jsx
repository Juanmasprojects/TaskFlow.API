import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")


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

async function loadTasks(search = "") {
  try {
    let url = 'http://localhost:5144/api/tasks'

    if (search) {
      url = `http://localhost:5144/api/tasks/search?search=${encodeURIComponent(search)}`
    }

    const response = await fetch(url)
    const data = await response.json()

    setTasks(data)
    setError("")
  }
  catch (error) {
    setError(error.message)
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
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    setTitle("")
    setDescription("")

    await loadTasks()
    setError("")
  }
  catch (error) {
    setError(error.message)
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
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
    await loadTasks()
    setError("")
  }
  catch (error) {
    setError(error.message)
  }
}

async function updateStatus(task, newStatus) {
  try {
    const response = await fetch(
      `http://localhost:5144/api/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: parseInt(newStatus)
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    await loadTasks()
    setError("")
  }
  catch (error) {
    setError(error.message)
  }
}

async function searchTasks() {
  await loadTasks(searchQuery)
}

useEffect(() => {
  loadTasks()
}, [])


//////////// UI ////////////
return (
  <div>
    <h1>TaskFlow</h1>
    {error && (
      <p>{error}</p>
    )}
    <input
  type="text"
  placeholder="Search tasks..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
<button onClick={searchTasks}>
  Search
</button>
<button
  onClick={() => {
    setSearchQuery("")
    loadTasks()
  }}
>
  Clear
</button>


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
  onChange={(e) => {
    setTitle(e.target.value) 
    setError("")
    }
    }
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
          <br />

        <select
         value={task.status}
         onChange={(e) => updateStatus(task, e.target.value)}
        >
        <option value="0">Todo</option>
        <option value="1">In Progress</option>
        <option value="2">Done</option>
        </select>
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