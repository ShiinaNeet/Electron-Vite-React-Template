import Navigationbar from './components/NavigationBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="overflow-x-scroll:hidden">
      <Navigationbar />
      <Outlet />
    </div>
  )
}
export default Layout
