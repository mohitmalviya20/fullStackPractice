import axios from 'axios'
import React, { useState } from 'react'
import {useHistory} from "react-router-dom"

function Login() {
    const history = useHistory()

    const [login,setLogin]=useState({
        email:"",
        password:""
    })
    console.log(login)

    const handleClick=()=>{
        const {email,password}=login
        axios.post("http://localhost:5000/api/signin",{
            email,password
        }).then(
            res=>{
                if(res.error){
                    alert(res.error)
                }
                else{
                    localStorage.setItem("instaCloneData",JSON.stringify(res.data))
                    history.push("/")
                }
            }
        ).catch(err=>{
            console.log(err)
        })

    }
    return (
        <div className="card">
            <h2>Instagram</h2>
            <input type="text" placeholder="email" onChange={(e)=>setLogin({...login,email:e.target.value})}/>
            <input type="password" placeholder="password" onChange={(e)=>setLogin({...login,password:e.target.value})}/>
            <button className="btn waves-effect waves-light" onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login
