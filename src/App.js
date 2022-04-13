import "./App.css";
import Chat from "./Chat";
import SideBar from "./SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Login from "./Login";
import { useStatevalue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStatevalue();

  // const [user, setUser] = useState(null);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <SideBar />
            <Routes>
              {/* <Route path="/" element={<SideBar />} /> */}
              <Route path="/rooms/:roomId" element={<Chat />}></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
