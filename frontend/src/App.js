import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link,useNavigate } from 'react-router-dom';
import Main from './components/Main';
import Task from './components/Task';
import Login from './components/Login';
import Signup from './components/Signup';
import New from './components/New';
import TaskDetail from './components/TaskDetail';

function App() {

  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [tasksusers, setTasksUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({id:0})
  const [selectedTask, selectTask] = useState({})
  const [selectedTaskUsers, setSelectedTaskUsers] = useState([])
  const [search, setSearch] = useState("")

  const filteredTasks = tasks.filter(task=>task.description.search(search)>-1)

  useEffect(()=>{
    fetch("http://localhost:9292/users")
    .then(res=>res.json())
    .then(users=>setUsers(users.users))
  }, [])

  useEffect(()=>{
    if (currentUser.id!==0){
      fetch(`http://localhost:9292/currentuser/tasks/${currentUser.id}`)
      .then(res=>res.json())
      .then(allTasks=>setTasks(allTasks.tasks))
    }
  },[currentUser.id])

  useEffect(()=>{
    if (currentUser.id!==0){
      fetch(`http://localhost:9292/currentuser/tasks/${currentUser.id}`)
      .then(res=>res.json())
      .then(allTasks=>setTasks(allTasks.tasks))
    }
  },[tasks])

  useEffect(()=>{
    fetch(`http://localhost:9292/tasks/${selectedTask.id}`)
    .then(res=>res.json())
    .then(taskusers=>setSelectedTaskUsers(taskusers.taskusers))
  },[selectedTask])

  useEffect(()=>{
    fetch(`http://localhost:9292/tasksusers`)
    .then(res=>res.json())
    .then(taskusers=>setTasksUsers(taskusers.tasksusers))
  },[])

  console.log(tasks)
  console.log(users)
  console.log(currentUser.id)
  console.log(selectedTaskUsers)
  console.log(tasksusers)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login users={users} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/home" element={<Main users={users} setSearch={setSearch} tasks={filteredTasks} allTasks={tasks} setCurrentUser={setCurrentUser} currentUser={currentUser} selectTask={selectTask} setTasks={setTasks}/>} />
        <Route path="/task" element={<Task users={users} tasks={tasks} currentUser={currentUser} selectTask={selectTask} selectedTask={selectedTask}/>} />
        <Route path="/login" element={<Login users={users} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/signup" element={<Signup users={users} setUsers={setUsers}/>} />
        <Route path="/newtask" element={<New currentUser={currentUser} setTasks={setTasks} tasks={tasks}/>} />
        <Route path="/taskdetail" element={<TaskDetail tasks={tasks} setTasks={setTasks} tasksusers={tasksusers} task={selectedTask} all_users = {users} setSelectedTaskUsers={setSelectedTaskUsers} users={selectedTaskUsers} currentUser={currentUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
