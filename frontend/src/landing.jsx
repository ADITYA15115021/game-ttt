

import { useNavigate } from "react-router-dom"
import ticGame from "./tic-tac-toe/online"

export default function Landing(){

    const navigate = useNavigate();

    return (
        <>

        <div className="px-8 flex flex-row justify-between
                         h-16 border-2 border-red-200">
            
            <div>
            Welcome,signup to save your records
            </div>
            
            <div className="flex fex-row justify-evenly w-1/3 ">
               <button onClick={()=>{navigate("/signup")}} className="bg-red-100 hover:bg-red-200 px-2 mt-2 mb-2 border border-red-800 rounded-lg  ">SIGN UP </button>
               <button className="px-2 mt-2 mb-2 border border-red-800 rounded-lg">LOG IN</button>
            </div>
            
        </div>

          <div className="m-4 grid grid-cols-3 gap-4" >
       
       
       <div onClick={ ()=>{navigate("tic-tac-toe")} } className="flex items-center justify-center h-32 bg-red-100 border rounded-lg border-red-700
                       hover:scale-105 hover:bg-red-200 transition-all duration-800">
                 TIC-TAC-TOE
       </div>
        
 
       <div className="bg-red-300"> 2</div>
       <div className="border rounded-lg bg-red-400">3</div>
 
       
         
      </div>
        </>
    )
}