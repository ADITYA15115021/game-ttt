import { useNavigate } from "react-router-dom"


export default function HomePage(){

    const navigate = useNavigate();
    return(
        <>
         <div className="h-screen bg-black flex flex-col justify-center">
            <div className="flex flex-row justify-center">
               <div className="flex flex-col ">
                   <div className="text-green-700 text-white text-6xl font-semibold">GAME HUB</div>
                   <button onClick={()=>{ navigate("/landing")}} className="m-24 h-12 rounded-full 
                    hover:border-2 hover:border-green-300 bg-green-900 text-white font-bold">LET START</button>
               </div>
            </div>
         </div>
        </>
    )
}