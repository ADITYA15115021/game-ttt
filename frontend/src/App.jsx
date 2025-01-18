import {BrowserRouter,Routes,Route} from "react-router-dom";


import ticGame from "./tic-tac-toe/online";
import Landing from "./landing";
import Main from "./tic-tac-toe/main";
import OnlineGame from "./tic-tac-toe/online";
import SignUp from "./signup";
import HomePage from "./homepage";
import ConnectFour from "./connect/two.jsx";


function App(){
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path="/landing" element={<Landing/>}>  </Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/tic-tac-toe" element={<Main/>}></Route>
        <Route path="/t-online" element={<OnlineGame/>}></Route>
        <Route path="/t-vsc"></Route>
        <Route path="/" element={<HomePage/>} ></Route>
        <Route path="/connect-four" element={<ConnectFour/>}></Route>
       </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App;
