import { useEffect, useState } from 'react'
import './App.css'
import TaskCard from './components/TaskCard'
import CreateTaskForm from './components/CreateTaskForm'
import SearchBar from './components/SearchBar'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState(null)


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

async function updateTask(taskToUpdate) {
  try {
    const response = await fetch(
      `http://localhost:5144/api/tasks/${taskToUpdate.taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskToUpdate.title,
          description: taskToUpdate.description,
          status: parseInt(taskToUpdate.status)
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    const updatedTask = await response.json()

    await loadTasks()
    setError("")

    return updatedTask
  }
  catch (error) {
    setError(error.message)
    throw error
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
  <div className="app">
    
    <header className="app-header">
        <h1>TaskFlow</h1>
        <p>ASP.NET Core REST API Portfolio Project</p>
        {error && (
        <p className="error-message">
        {error}
       </p>
)}
    </header>

    <div className="content">
      <div className="left-panel">
        {/* Todo lo de la izquierda */}

        <div>
          <h2>About Project</h2>

          <p>
          Placeholder
          </p>
        </div>

        <div>
          <h2>Search Task</h2>
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchTasks={searchTasks}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />   
        </div>
          <h2>Create New Task</h2>
          <CreateTaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            createTask={createTask}
            setError={setError}
          />
        <div>

        </div>

        <div>
          <h2>Demo Notice</h2>

          <p>
          Placeholder
          </p>
        </div>

      </div>

      <div className="right-panel">
      {/* Todo lo de la derecha */}
        <TaskList
          tasks={tasks}
          selectedStatus={selectedStatus}
          deleteTask={deleteTask}
          getStatusText={getStatusText}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          updateTask={updateTask}
        />

      </div>

    </div>

  </div>
)


}

export default App