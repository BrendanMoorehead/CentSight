import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import Header from './Header';
const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="2xl:px-80">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
