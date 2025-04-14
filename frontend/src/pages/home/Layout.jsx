import Navbar from "../components/Navbar";
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div className="relative overflow-hidden min-h-[100vh] bg-white dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default Layout;
