import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup({users, setUsers}){

    const [username, setName] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate()

    function handleSignup(e){
        e.preventDefault()
        let newUser = {
            id: users.length + 1,
            name: username,
            password: password
        }
        fetch("http://localhost:9292/newuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        setUsers([...users, newUser])
        nav('/login')
    }

    return(
        <div className="signup">
            <form onSubmit={(e)=>handleSignup(e)}>
                <h1>Sign up</h1>
                <input type="text" name="username" placeholder="Enter your username" id="username" onChange={e=>setName(e.target.value)} required/>
                <input type="password" name="password" placeholder="Enter your password" id="password" onChange={e=>setPassword(e.target.value)} required/>
                <button type="submit">Create account</button>
                <p>Already have an account?</p><Link to="/login">Log in</Link>
            </form>
        </div>
    )
}

export  default Signup;