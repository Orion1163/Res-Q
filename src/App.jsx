import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Contact from "./components/contact/contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route path="/aboutus" element={<Home/>}/>
          <Route path="/contactus" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
