import "flowbite";
import "./App.css";
import { About } from "./views/About";
import { Home } from "./views/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { NotFound } from "./views/auth/NotFound";
import { Layout } from "./views/Layout";

function App() {
  return (
    <div className="bg-primary-50 ">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
