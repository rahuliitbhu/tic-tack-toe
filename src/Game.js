
import {useEffect, useRef,useState} from 'react'

import firebase from './firebase.js'

function Game({user}) {

  const [gameresult,setGameresult]=useState(-2);
  const [email,setEmail]=useState("")
  const [userdata,setuserdata]=useState([])
  const [name,setName]=useState("")
  const [data,setData]=useState(null)

 function resulting(res)
 {
  firebase.firestore().collection('userresult').add({
    ...data,
    gameresult:res
    
  
    })
    .then((data)=>{
      console.log(data)
  })
 }
  useEffect( ()=>{
    const result=firebase.firestore().collection('usergame').get().then((dataRef)=>{
        const data =  dataRef.docs.map((doc)=>doc.data())
        console.log(data)
       // setuserdata(data)
       const res=data[data.length-1]
       setData(res)
       
         })
     
},[])


  let sign = "x";

let isko;
const disp=useRef(null)
const cell1=useRef(null)
const cell2=useRef(null)
const cell3=useRef(null)
const cell4=useRef(null)
const cell5=useRef(null)
const cell6=useRef(null)
const cell7=useRef(null)
const cell8=useRef(null)
const cell9=useRef(null)

function printx(cell){

  //console.log(cell.current.innerText);
  
  if(cell.current.innerText==""){
  cell.current.innerText=sign;
  winner();
  checksign();
  if(sign=="o")
  {
    disp.current.innerText= "Their move";
    disp.current.innerHTML = "<center>" + "Their move" + "</center>";
  }
  else
  {
    disp.current.innerText= "Your move";
    disp.current.innerHTML = "<center>" + "Your move" + "</center>";
  }

 
  }
  
  
}





function checksign(){
    if(sign=="x")sign ="o";
    else sign = "x";
   
}
function getbox(no){
    return document.getElementById("r"+no).innerHTML;
}
function checkmove(a,b,c,m){
    if(getbox(a)==m && getbox(b)==m && getbox(c)==m)
       return true;
    else return false;   
}

function winner(){
if(checkmove(1,2,3,sign)||checkmove(4,5,6,sign)||checkmove(7,8,9,sign)
    ||checkmove(1,4,7,sign)||checkmove(2,5,8,sign)||checkmove(3,6,9,sign)
    ||checkmove(1,5,9,sign)||checkmove(7,5,3,sign)){

      if(sign=="o")
   { disp.current.innerHTML = "<center>" +"You lost" + "</center>";
     disp.current.className="red"
  
     resulting("lost")
    }
    else{
      disp.current.innerHTML = "<center>" +"You won" + "</center>";
      disp.current.className="green"
      
      resulting("won")
    }
    cell1.current.innerText="";
    cell2.current.innerText="";
    cell3.current.innerText="";
    cell4.current.innerText="";
    cell5.current.innerText="";
    cell6.current.innerText="";
    cell7.current.innerText="";
    cell8.current.innerText="";
    cell9.current.innerText="";
    
   throw "game end";
}else{
    if(getbox(1)!=""&& getbox(2)!=""&& getbox(3)!=""&&
   getbox(4)!=""&& getbox(5)!=""&& getbox(6)!=""&&
   getbox(7)!=""&& getbox(8)!=""&& getbox(9)!=""){

    disp.current.innerHTML = "<center> its a tie </center>";
    
    resulting("tie")
       throw "its a tie";
   }
}
}
  return (
    <div >

    
     {data.opponentname?<h2><center>Game with {data.opponentname}</center></h2>:<></>}
       <h6><center>Your piece</center></h6>
       <h2><center>X</center></h2>
        <h1 ref={disp} ><center>Your move</center></h1>
     <table >
    
     <tr>
         <td ref={cell1} id="r1" onClick={()=>printx(cell1)}></td>
         <td ref={cell2} id="r2" onClick={()=>printx(cell2)}></td>
         <td ref={cell3} id="r3" onClick={()=>printx(cell3)}></td>
     </tr>
     <tr  >
         <td ref={cell4} id="r4" onClick={()=>printx(cell4)}></td>
         <td ref={cell5} id="r5" onClick={()=>printx(cell5)}></td>
         <td ref={cell6} id="r6" onClick={()=>printx(cell6)}></td>
     </tr>
      <tr>
         <td ref={cell7} id="r7" onClick={()=>printx(cell7)}></td>
         <td ref={cell8} id="r8" onClick={()=>printx(cell8)}></td>
         <td ref={cell9} id="r9" onClick={()=>printx(cell9)}></td>
     </tr>
     
 </table> 
    </div>
  );
}

export default Game;
