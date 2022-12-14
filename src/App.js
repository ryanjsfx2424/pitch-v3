import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Mint from "./components/Mint";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/mint" element={<Mint />} />
		</Routes>
	)
}

export default App;
