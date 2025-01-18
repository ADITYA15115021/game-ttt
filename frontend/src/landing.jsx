

import { useNavigate } from "react-router-dom"
import ticGame from "./tic-tac-toe/online"

export default function Landing(){

    const navigate = useNavigate();

    return (
        <>

        <div className="px-8 flex flex-row justify-between
                        bg-black h-24 border-b  border-gray-100
                        ">
            
            <div className="flex flex-row justify-center items-center
                            text-white">
                 WELCOME, 
            </div>
            
            <div className="flex fex-row justify-evenly items-center w-1/3">
               <button onClick={()=>{navigate("/signup")}} 
                className="h-12 bg-green-600 hover:bg-green-400 px-2 mt-2 mb-2 rounded-lg shadow-md shadow-green-200 ">SIGN UP </button>
               
               <button className="h-12 px-2 mt-2 mb-2 bg-green-600 rounded-lg  shadow-green-200 shadow-md">LOG IN</button>
            </div>
            
        </div>


    <div className="h-screen bg-black border border-black flex flex-col justify-center">
        <div className="    flex flex-row justify-center w-full">

            <div className="  m-4 grid grid-cols-2 gap-3 w-1/2 h-64" >
                <div onClick={ ()=>{navigate("/tic-tac-toe")} } 
                className="flex items-center justify-center h-32 bg-white shadow-md shadow-white rounded-lg border-red-700
                                hover:scale-105 hover:bg-red-200 transition-all duration-800
                                text-lg font-bold ">
                            TIC-TAC-TOE
                </div>

                <div onClick={()=>{navigate("/connect-four")}} className="flex items-center justify-center h-32 bg-white  rounded-lg shadow-md shadow-white
                                 hover:scale-105 hover:bg-red-200 transition-all duration-800
                                 font-bold text-lg">
                            CONNECT-4
            
                </div>

        </div>

        </div>
    </div>    

   

    </>
    )
}