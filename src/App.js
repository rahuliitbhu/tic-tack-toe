import logo from './logo.svg';
import {useEffect,useState } from 'react'
import './App.css';
import routes from './Routes.js';
import Game from './Game.js'
import Login from './Login.js'
import Home from './Home.js'
import Signup from './Signup.js'
import Newgame from './Newgame.js'
import firebase from './firebase.js'
import {Routes,Route,BrowserRouter,useRoutes,Switch} from 'react-router-dom'

function App() {
  const [opp,setOpp]=useState(null)
  const [user,setUser] = useState(null)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user) setUser(user)
      else setUser(null)
    })
  },[])

  return (
   
         <div className="App">
          <BrowserRouter>
          <Switch>
          <Route exact path="/">
        <Home user={user}/>
      </Route>
          <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup  />
      </Route>
     
      <Route  path="/newgame">
        <Newgame user={user} />
      </Route>
      <Route  path="/game">
        <Game user={user}  />
      </Route>
          </Switch>
          
          </BrowserRouter>
          
          
      </div>

       
   
  );
}

export default App;
