import { useEffect, useState } from 'react'
import './App.css'
import TaskCard from './components/TaskCard'
import CreateTaskForm from './components/CreateTaskForm'
import SearchBar from './components/SearchBar'
import TaskList from './components/TaskList'
import Toast from "./components/Toast"
import ConfirmDialog from './components/ConfirmDialog'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  
  const [selectedStatus, setSelectedStatus] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTask, setSelectedTask] = useState(null)

  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState(null)


//////////// FUNCTIONS ////////////
   function getStatusText(status) {
    switch (status) {
      case 0:
        return "To Do"
      case 1:
        return "In Progress"
      case 2:
        return "Done"
      default:
        return "Unknown"
    }
  }

  function getStatusClass(status) {
    switch (status) {
      case 0:
        return "status-todo"
      case 1:
        return "status-progress"
      case 2:
        return "status-done"
      default:
        return ""
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
    setToast(null)
  }
  catch (error) {
    setToast({
      type: "error",
      message: error.message
    })
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
      console.log(errorData)
      throw new Error(errorData.message)
    }

    setTitle("")
    setDescription("")

    await loadTasks()
      setToast({
      type: "success",
      message: "Task created successfully."
    })
  }
  catch (error) {
    setToast({
      type: "error",
      message: error.message
    })
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
    setToast({
      type: "success",
      message: "Task deleted successfully."
    })
  }
  catch (error) {
    setToast({
      type: "error",
      message: error.message
    })
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
    setToast({
      type: "success",
      message: "Task updated successfully."
    })


    return updatedTask
  }
  catch (error) {
    setToast({
      type: "error",
      message: error.message
    })
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
        <Toast
        toast={toast}
        setToast={setToast}
        />
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
            setToast={setToast}
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
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <TaskList
          tasks={tasks}
          selectedStatus={selectedStatus}
          deleteTask={deleteTask}
          getStatusText={getStatusText}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          updateTask={updateTask}
          setConfirmDialog={setConfirmDialog}
          getStatusClass={getStatusClass}
        />

      </div>

    </div>

  </div>
)


}

export default App