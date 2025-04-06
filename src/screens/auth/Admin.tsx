import { useState } from 'react';
import Statistics from './Admin/Statistics';
import VolunteerManagement from './Admin/VolunteerManagement';
import CampainManagement from './Admin/CampainManagement';
import PostManagement from './Admin/PostManagement';
import OriginManagement from './Admin/OriginManagement';
import SideBar from './components/SidebBar';

const Admin = () => {
    const [selectedPage, setSelectedPage] = useState('Statistics');

    const renderContent = () => {
        switch (selectedPage) {
            case 'Statistics':
                return <Statistics />;
            case 'VolunteerManagement':
                return <VolunteerManagement />;
            case 'CampainManagement':
                return <CampainManagement />;
            case 'PostManagement':
                return <PostManagement />;
            case 'OriginManagement':
                return <OriginManagement />;
            default:
                return <Statistics />;
        }
    };

    return (
        <div className='bg-[#EDF1D6] w-screen h-min-full flex'>
            <SideBar onSelect={setSelectedPage} />
            <div className="flex-1">
                <div className="p-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Admin;