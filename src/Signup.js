import React, { useState ,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'


import firebase from './firebase.js'

const Signup = () => {

  const [res,setRes] =useState(false)
  const disp=useRef(null)
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  
  const handleSubmit= async (e)=>{
    e.preventDefault()
    console.log(username,password,name,email)
    try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email,password)
        
       const id=result.user.multiFactor.user.uid;
        console.log(id)
        firebase.firestore().collection('Users').add({
            name:name,
            username:username,
            email:email
   
            })
            .then((data)=>{
              console.log(data)
          })
        if(result)
        setRes(true)

    } 
    catch(err)
    {
        console.log(err)
    }
    
  }


  return (
    
    
             
  <div>
    <h6>Create account</h6>
 <h2>
  Let’s get to know <br/> you better!

  </h2>
  <form onSubmit={(e)=>handleSubmit(e)}>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Your name</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Type your name here" value={name} onChange={(e)=>{setName(e.target.value)}}/>
</div>
  <div class="mb-3">
  <label for="exampleFormControlInput2" class="form-label">Username</label>
  <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="Type your username here" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
</div>
  <div class="mb-3">
  <label for="exampleFormControlInput3" class="form-label">Email</label>
  <input type="email" class="form-control" id="exampleFormControlInput3" placeholder="Type your email here" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
</div>

  <div class="mb-3">
  <label for="exampleFormControlInput4" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput4" placeholder="Type your password here" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
</div>
{
    
     res?<h1 style={{background:"#6FCF97"}}>Congratulations!!! Account created.</h1>:<></>
}
<button disable={res} type="submit" class="btn btn-primary">Register</button>
  </form>





  </div>
      
  
  
  )
}

export default Signup