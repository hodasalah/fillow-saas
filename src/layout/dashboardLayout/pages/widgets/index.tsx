import { faBagShopping, faChartSimple, faUserGroup, faWallet } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import StatsCard from './components/StatsCard';
import TaskWidget from './components/TaskWidget';
import TimelineWidget from './components/TimelineWidget';
import WeatherWidget from './components/WeatherWidget';

const WidgetsPage: React.FC = () => {
    const mode = useAppSelector((state) => state.sidebar.mode);
    const isMobileView = useAppSelector((state) => state.sidebar.isMobileView);

    return (
        <div
            className={`
                ${
                    isMobileView
                        ? 'px-3'
                        : mode === 'wide'
                        ? 'pl-[var(--dz-sidebar-width)]'
                        : 'pl-[var(--dz-sidebar-width-mobile)]'
                } 
                w-full bg-[var(--body-bg)] text-[0.875rem] min-h-[calc(100vh-5.3rem)] pt-[var(--dz-header-height)] transition-all duration-300
            `}
        >
            <div className="container-fluid p-6">
                 <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-1">Widgets</h2>
                    <p className="text-gray-500">A collection of ready-to-use dynamic components.</p>
                </div>

                {/* Grid of Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard 
                        title="Total Earnings" 
                        value="$24,500" 
                        trend="12.5%" 
                        trendUp={true} 
                        icon={faWallet} 
                        color="linear-gradient(to right, #886cc0, #a084d6)"
                    />
                    <StatsCard 
                        title="Total Orders" 
                        value="1,240" 
                        trend="8.2%" 
                        trendUp={true} 
                        icon={faBagShopping} 
                        color="linear-gradient(to right, #ff9900, #ffb347)"
                    />
                    <StatsCard 
                        title="New Customers" 
                        value="856" 
                        trend="2.4%" 
                        trendUp={false} 
                        icon={faUserGroup} 
                        color="linear-gradient(to right, #2dd4bf, #5eead4)"
                    />
                     <StatsCard 
                        title="Bounce Rate" 
                        value="32.4%" 
                        trend="0.8%" 
                        trendUp={true} 
                        icon={faChartSimple} 
                        color="linear-gradient(to right, #f43f5e, #fb7185)"
                    />
                </div>

                {/* Grid of Complex Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="w-full">
                        <TimelineWidget />
                    </div>
                    <div className="w-full">
                        <TaskWidget />
                    </div>
                    <div className="w-full">
                        <WeatherWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetsPage;
