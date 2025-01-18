import { useNavigate } from "react-router-dom"

import OnlineGame from "./online";

export default function Main(){

    const navigate = useNavigate();
   
    return (
        <>
          <div className="h-screen bg-black flex flex-row justify-center">
            
            <div className="w-1/3 border border-black flex flex-col justify-center">
                 
                 <div className="h-1/4  flex flex-col justify-evenly
                    ">
                     
                     <div onClick={()=>{navigate("/t-online")}} className="rounded m-2 px-8 flex items-center justify-center
                                    hover:scale-105  hover:border-4 hover:border-red-800 hover:bg-red-200 transition-all bg-red-700">
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