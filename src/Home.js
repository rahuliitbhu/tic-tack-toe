import {useEffect, useRef,useState} from 'react'
import { Link, useNavigate,Redirect,useHistory } from 'react-router-dom'
import Card from './Card.js'


import firebase from './firebase.js'
function Home() {
    const [data,setData]=useState(null)
    useEffect( ()=>{
        const result=firebase.firestore().collection('userresult').get().then((dataRef)=>{
            const data =  dataRef.docs.map((doc)=>doc.data())
    
           // setuserdata(data)
           const res=data[data.length-1]
           setData(res)
           
             })
             
    },[])
    
  return (
    <div>
        <h2>Your Games</h2>
        
        {data?<Card name={data.opponentname} res={data.gameresult}/>:<></>}
         <Link to="/newgame"> <button class="btn btn-primary"> Start a new game </button> </Link>
    
      
    </div>
  )
}

export default Home