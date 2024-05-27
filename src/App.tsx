import "flowbite";
import { About } from "./views/About";
import { Home } from "./views/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { Layout } from "./views/Layout";
import { useState } from "react";
import { Assistant } from "./assistant";
import AssistantContext, { ResponseMessage } from "./context/AssistantContext";
import { NotFound } from "./views/NotFound";

function App() {
	const [assistant, setAssistant] = useState<Assistant | null>(null);
	const [responseMessage, setResponseMessage] = useState<ResponseMessage | null>(null);

  return (
    <div className="bg-primary-50 ">
			<AssistantContext.Provider
				value={{
					assistant: assistant,
					setAssistant: setAssistant,
					responseMessage: responseMessage,
					setResponseMessage: setResponseMessage,
				}}
			>
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
			</AssistantContext.Provider>
    </div>
  );
}

export default App;
