import React, { useState,useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from './firebase.js'
const Login = () => {


    const [res,setRes] =useState(false)
    const [userdata,setuserdata]=useState([])
   // const navigate=useNavigate()

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
useEffect( ()=>{
    const result=firebase.firestore().collection('Users').get().then((dataRef)=>{
        const data =  dataRef.docs.map((doc)=>doc.data())
        setuserdata(data)
         })
},[])

  const handleSubmit=async (e)=>{
    e.preventDefault()
  //  console.log(username,password)
    try{
        console.log(userdata)
        userdata.map( async (item)=>{
            console.log(item)
            if(item.username==username)
           { const res = await firebase.auth().signInWithEmailAndPassword(item.email,password)
            console.log(res)
           }
        })
       // console.log(result)
        
        
    } 
    catch(err)
    {
       // if(result)
      //  setRes(true)
        console.log(err)
    }
  }


  return (
    
    
             
  <div>
  <h6>Login</h6>
  <h2>
  Please enter your
 <br/> details

  </h2>
  <form onSubmit={(e)=>handleSubmit(e)}>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Username</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Type your username here" value={username}  onChange={(e)=>{setUsername(e.target.value)}}/>
</div>

  <div class="mb-3">
  <label for="exampleFormControlInput2" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput2" placeholder="Type your password here" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
</div>
{
    
    res?<h1 style={{background:"#EB5757"}}>Enter correct details.</h1>:<></>
}
<button type="submit" class="btn btn-primary">Login</button>
  </form>





  </div>
      
  
  
  )
}

export default Login