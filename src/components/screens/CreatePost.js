import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

function CreatePost() {
    const history = useHistory()
    const [data,setData]=useState({
        title:"",
        body:"",
        file:""
    })

    const [file,setFile]=useState(null)
    console.log(data,file)

    const uploadImage=()=>{

        const formData = new FormData()
        formData.append("file",file)
        formData.append("upload_preset","instaclone")
        formData.append("cloud_name","dwrkndh9p")
        axios.post("https://api.cloudinary.com/v1_1/dwrkndh9p/image/upload",formData)
            .then(
                res=>{
                    
                    const {title,body}=data
                    axios.post("http://localhost:5000/api/createPost",{title,body,photo:res.data.url},{headers:{
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("instaCloneData")).token}` 
                    }}).then(
                        apiData=>{
                            history.push("/")
                        }
                    ).catch(err=>console.log(err))
                }
            ).catch(err=>console.log(err))
    }
    return (
        <div>
            <input type="text" placeholder="title" onChange={(e)=>setData({...data,title:e.target.value})}/>
            <input type="text" placeholder="body" onChange={(e)=>setData({...data,body:e.target.value})}/>
            
                <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light" onClick={uploadImage}>Submit</button>
          
        </div>
    )
}

export default CreatePost
