import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import Header from './Header';
const MainLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div style={{ flex: 1 }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
