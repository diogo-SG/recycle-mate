import "./App.css";
import { About } from "./views/About";
import { Home } from "./views/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { NotFound } from "./views/auth/NotFound";
import { useState } from "react";
import { Assistant } from "./assistant";
import AssistantContext from "./context/AssistantContext";

function App() {
	const [assistant, setAssistant] = useState<Assistant | null>(null);

	return (
		<>
			<AssistantContext.Provider
				value={{
					assistant: assistant,
					setAssistant: setAssistant,
				}}
			>
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Router>
			</AssistantContext.Provider>
		</>
	);
}

export default App;
