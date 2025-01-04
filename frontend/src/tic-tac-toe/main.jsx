import { useNavigate } from "react-router-dom"

import OnlineGame from "./online";

export default function Main(){

    const navigate = useNavigate();
   
    return (
        <>
          <div className="h-screen flex flex-row justify-center">
            
            <div className="w-1/2 border border-black flex flex-col justify-center">
                 
                 <div className="h-1/4 border border-red-700 flex flex-row justify-between">
                     
                     <div onClick={()=>{navigate("/t-online")}} className="border rounded m-2 px-8 flex items-center justify-center
                                    hover:scale-105 hover:bg-red-400 transition-all bg-red-100">
                        PLAY ONLINE
                    </div>

                     <div className="border m-2 px-8 flex items-center justify-center
                                    hover:scale-105 hover:bg-red-400 transition-all bg-red-100">VS COMPUTER</div>
                 
                 </div>
            
            </div>
          </div>
        </>
    )
}