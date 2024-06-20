

import React,{useState,useRef} from "react";
import ToDo from "./ToDoapp";

function sample(){

     const[count,setCount]=useState(0);

     function incriment(){
        setCount(c=>c+1)
     }
     function dicriment(){
        setCount(c=>c-1)
     }

    return(
        <>
        <h1>counter</h1>
        <h2>{count}</h2>
        
        <button onClick={incriment}>+</button>
        <button onClick={dicriment}>-</button>
         
         <ToDo data={count}/>
         

        </>
        
    )

}


export default sample