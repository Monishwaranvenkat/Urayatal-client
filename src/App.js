import "./App.css";
import PrivateRoutes from './Components/PrivateRoutes'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import ChatHome from "./pages/ChatHome"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
	return (
		<div className='App'>
			<div className='appbody'>
				<Router>
					<Routes>
						<Route path='/' element={<Login />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/signup' element={<Signup />}></Route>
						<Route element={<PrivateRoutes />}>
							<Route path='/chat' element={<ChatHome />} />
						</Route>
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
