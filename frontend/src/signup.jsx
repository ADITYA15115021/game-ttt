


export default function SignUp(){
    return (
        <>
        <div className="h-screen flex flex-row justify-center">
            <div className="flex flex-col justify-center">
                
                <div className=" flex flex-col border border-bg-gray-700">
                     
                     <div className="text-center font-extrabold">
                         SIGNUP                       
                     </div>

                     <div className="border border-gray-500 flex flex-col m-4">

                        <div className="m-4 px-2 flex flex-row justify-evenly">
                            <label>USERNAME</label>
                            <input  className="ml-4 border border-gray-300" placeholder="aditya"></input>
                        </div>

                        <div className="m-2 px-2 flex flex-row justify-evenly">
                            <label>EMAIL</label>
                            <input className="ml-8 border border-gray-300 rounded" placeholder=""></input>
                        </div>

                        <div className="m-2 px-2 flex flex-row justify-evenly">
                            <label >PASSWORD</label>
                            <input className="border border-gray-300" placeholder=""></input>
                        </div>

                     </div>
                     
                </div>
            </div>
        </div>
        </>
    )
}