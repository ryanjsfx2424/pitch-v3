import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Mint from "./Mint";

function App() {
	const url = window.location.href;
	const isMintPage = url.includes("mint");
	return (
		<>
			{
				(isMintPage) ?
					<Mint /> 
				: 
					<Homepage />
			}
		</>
	)
		{/* <Switch>
			<Route path="/" element={<Homepage />} />
			<Route path="/mint" element={<Mint />} />
		</Switch> */}
}

export default App;