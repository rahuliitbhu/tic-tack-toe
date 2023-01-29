import {useEffect, useRef,useState} from 'react'
import { Link, useNavigate,Redirect,useHistory } from 'react-router-dom'
import Card from './Card.js'


import firebase from './firebase.js'
function Home({user}) {
    const [data,setData]=useState([])
    useEffect( ()=>{
        const result=firebase.firestore().collection('userresult').get().then((dataRef)=>{
            const data =  dataRef.docs.map((doc)=>doc.data())
    
           // setuserdata(data)
           
           setData(data)
           
             })
             
    },[])
    
  return (
    <div>
        <h2>Your Games</h2>
     
        {data.map((item)=>{

if(item.useremail==user.multiFactor.user.email)
return <Card name={item.opponentname} res={item.gameresult}/>

})
}
         <Link to="/newgame"> <button class="btn btn-primary"> Start a new game </button> </Link>
    
      
    </div>
  )
}

export default Home