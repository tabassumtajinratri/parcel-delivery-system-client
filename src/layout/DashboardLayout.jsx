import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
            <div className='md:col-span-1 lg:col-span-1'>
                            <DashboardSidebar></DashboardSidebar>

            </div>
            <div className='md:col-span-2 lg:col-span-3'>
                           <Outlet />

            </div>
        </div>
    );
};

export default DashboardLayout;