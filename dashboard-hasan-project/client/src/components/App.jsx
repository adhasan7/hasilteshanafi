import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import DashboardPage from "../pages/Dashboard.jsx";
import KaryawanPage from "../pages/Karyawan.jsx";
import KontraktorPage from "../pages/Kontraktor.jsx";
import UsersPage from "../pages/Users.jsx";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/karyawan" element={<KaryawanPage />} />
				<Route path="/kontraktor" element={<KontraktorPage />} />
				<Route path="/users" element={<UsersPage />} />
			</Routes>
		</>
	);
}

export default App;
