import {BrowserRouter,Routes,Route} from "react-router-dom";


import ticGame from "./tic-tac-toe/online";
import Landing from "./landing";
import Main from "./tic-tac-toe/main";
import OnlineGame from "./tic-tac-toe/online";
import SignUp from "./signup";


function App(){
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<Landing/>}>  </Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="tic-tac-toe" element={<Main/>}></Route>
        <Route path="t-online" element={<OnlineGame/>}></Route>
        <Route path="t-vsc"></Route>
       </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App;
