import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './views/Home'
import Settings from './views/Settings'

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout></RootLayout>}>
					<Route index element={<Home></Home>}></Route>
					<Route path="settings" element={<Settings></Settings>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
