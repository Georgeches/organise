import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import Task from "./Task";

function Main({currentUser, setCurrentUser, tasks, setTasks, selectTask, setSearch, allTasks}){
    const nav = useNavigate()

    function hanleLogout(e){
        e.preventDefault()
        setCurrentUser({id:0})
        nav('/login')
    }
    function addTask(e){
        e.preventDefault()
        nav('/newtask')
    }
    return(
        <>
        {currentUser.id === 0
        ?
        <div className="login-first">
        <h1>Please Log in first</h1>
        <Link to='/'>Log in</Link>
        </div>
        :
        <>
        <div className="header">
            <h2>{currentUser.name}</h2>
            <h4 onClick={e=>hanleLogout(e)}><Link style={{color: 'rgb(183, 183, 183)', textDecoration: 'none'}} to = "/">Log out</Link></h4>
        </div>
        <div className="main-body" style={{width: window.screen.width.toString() + 'px', textAlign: 'center'}}>
            <div className="body-header">
                {tasks.length===1?<h2>You have {allTasks.length} task</h2>:<h2>You have {allTasks.length} tasks</h2>}
            </div>
            <div className="search-body">
                <input type="text" id="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
            </div>
            <div className="tasks-body" style={{width: window.screen.width*0.8.toString() + 'px'}}>
                {tasks.map(thisTask=><Task task={thisTask} selectTask={selectTask} currentUser={currentUser}/>)}
            </div>
            <button onClick={e=>{addTask(e)}} className="new-task-button"><i class="las la-plus"></i></button>
        </div>
        </>
        }
        </>
    )
}

export default Main;