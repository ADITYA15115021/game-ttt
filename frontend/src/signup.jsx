


export default function SignUp(){
    return (
        <>
        <div className="h-screen flex flex-row justify-center">
            <div className="flex flex-col justify-center">
                
                <div className=" flex flex-col border rounded-lg border-gray-300 shadow-2xl">
                     
                     <div className="mt-6 mb-14 text-4xl text-center font-bold">
                         SIGNUP                       
                     </div>

                     <div className="flex flex-col m-4">

                        <div className="m-2 px-2 flex flex-row justify-evenly">
                            <label>USERNAME</label>
                            <input  className="ml-4 border border-gray-300" placeholder="aditya"></input>
                        </div>

                        <div className="m-2 px-2 flex flex-row justify-evenly">
                            <label>EMAIL</label>
                            <input className="ml-10 border border-gray-300 rounded" placeholder=""></input>
                        </div>

                        <div className="m-2 px-2 flex flex-row justify-evenly">
                            <label >PASSWORD</label>
                            <input className="border border-gray-300" placeholder=""></input>
                        </div>
                        
                        <div className="flex flex-row justify-center">
                        <button className="m-4 w-24 text-white bg-black border8 rounded-md border-gray-700"> SIGNUP </button>
                        </div>
                        

                     </div>
                     
                </div>
            </div>
        </div>
        </>
    )
}