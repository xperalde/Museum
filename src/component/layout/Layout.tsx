import { Suspense } from 'react'
import { Outlet } from "react-router-dom"
import Header from '../header/header'
import Preloader from '../preloader/Preloader'
const Layout: React.FC = () => {
	return (
		<>
		<Header/>
		<Suspense fallback={<Preloader/>}>
			<Outlet/>
		</Suspense>
		</>
	)
}
export default Layout