import React,{useState,useEffect} from 'react'

import firebase from './firebase.js'
function Newgame({user}) {

    const [email,setEmail]=useState("")
    const [userdata,setuserdata]=useState([])
    const [name,setName]=useState("")
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
                if(item.email==email)
               { 
                firebase.firestore().collection('usergame').add({
                useremail:user.multiFactor.user.email,
                opponentemail:email,
                opponentname:item.name,
                
       
                })
                .then((data)=>{
                  console.log(data)
              })
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
        <h6>Start a new game</h6>
        <h2>Whom do you want <br/> to play with?</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div class="mb-3">
  <label for="exampleFormControlInput3" class="form-label">Email</label>
  <input type="email" class="form-control" id="exampleFormControlInput3" placeholder="Type your email here" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
</div>
 
      <button type="submit" class="btn btn-primary">Start a new game</button>
        </form>
    </div>
  )
}

export default Newgame