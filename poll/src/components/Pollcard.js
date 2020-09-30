
import React from 'react';
import style from './Polls.module.css'
import {Link} from "react-router-dom"
function Pollcard ({item="horferfer",...props}){
    
     return (
<Link to={{pathname:'/VoteChart',state:{item}}} className={style.link} >
     <div className={style.pollcard}>
     <h1>{item.question}</h1>
     <div>
     {Object.keys(item.options).map((option)=>{
          var ratio=item.totalVotes === 0 ? 0 : Math.round(item.options[option]/item.totalVotes*100)
          return (
               <div className={style.option} key={option}>
                   <span>{option}</span>
                   <span style={{width:ratio*3,backgroundColor:'green'}} ></span>
                   <span >%{ratio}</span>
              </div>
         )  
     })}
     </div>

     
     </div>
</Link>
    
     )

}
 

 export default Pollcard;