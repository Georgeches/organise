import { useState } from "react";

function TaskDetail({task, tasksusers, users, all_users, setSelectedTaskUsers, currentUser}){
    const [newUserId, setNewUserId] = useState("")

    function addUser(e){
        e.preventDefault()
        if(newUserId===""){
            alert("Please choose a user first")
        }
        else{
            let found_users = users.filter(user=>user.id===parseInt(newUserId))
            if(found_users.length === 0){
                let newTaskUserId = {
                    user: parseInt(newUserId),
                    task: task.id
                }
                fetch("http://localhost:9292/addtaskuser", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTaskUserId)
                })
                .then(res=>res.json())
                .then(data=>console.log(data))
                .catch(err=>console.log(err))
                setSelectedTaskUsers([...users, all_users.find(user=>user.id===parseInt(newUserId))])
            }
            else{
                alert("The user is already added")
            }
        }
    }

    function removeUser(e, user) {
        e.preventDefault();
        fetch(`http://localhost:9292/removeuser/${user.id}/${task.id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Failed to delete user from task");
            }
          })
          .then((data) => console.log(data))
          .catch((err) => {
            console.log(err);
          });
      }

    return(
        <div className="task-detail">
            <div className="detail-header">
                <h1>{task.name}</h1>
                <select onChange={e=>setNewUserId(e.target.value)}>
                    <option value="">Choose user</option>
                    {all_users.map(user=><option value={user.id}>{user.name}</option>)}
                </select>
                <button className="add-user" onClick={e=>addUser(e)}>Add user</button>
            </div>
            <h2>Description:</h2>
            <h3>{task.description}</h3>
            <h2>Users:</h2>
            {users.map(user=>user.id===task.admin?
                <div>
                    <p className="admin-name">{user.name}</p>
                    <p className="admin-tag">admin</p>
                </div>:
                <div>
                    <p className="admin-name">{user.name}</p>
                    
                    {user.id===currentUser.id?
                        <p className="remove-user" onClick={e=>removeUser(e, user)}>exit</p>
                    :
                        currentUser.id === task.admin?
                            <p className="remove-user" onClick={e=>removeUser(e, user)}>remove</p>
                        :
                            console.log("You are not the admin")
                    }
                </div>
            )}
        </div>
    )
}

export default TaskDetail;