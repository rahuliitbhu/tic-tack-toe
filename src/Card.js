import {useEffect, useRef,useState} from 'react'

import firebase from './firebase.js'

function Card({name,res}) {
  return (
    <div>
        <div class="card" >
  
  <div class="card-body">
    <h5 class="card-title">Game with {name}</h5>
    <p class="card-text">{res}</p>
    <a href="#" class="btn btn-primary">View game</a>
  </div>
</div>
    </div>
  )
}

export default Card