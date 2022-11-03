import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./components/Hero"
import "./App.css"

function App() {
	const [loggedin, setLoggedin] = useState(false)
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Header
									page="Home"
									loggedin={loggedin}
								/>
								<Hero />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
