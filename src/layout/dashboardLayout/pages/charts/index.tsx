import React from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import PerformanceRadarChart from './components/PerformanceRadarChart';
import ProjectStatusPieChart from './components/ProjectStatusPieChart';
import RevenueAreaChart from './components/RevenueAreaChart';
import UserActivityBarChart from './components/UserActivityBarChart';

const ChartsPage: React.FC = () => {
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
                <div className="flex justify-between items-center mb-6">
                    <div>
                         <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-1">Analytics Overview</h2>
                         <p className="text-gray-500">Monitor your key performance metrics in real-time.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="w-full">
                        <RevenueAreaChart />
                    </div>
                    <div className="w-full">
                        <UserActivityBarChart />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="w-full lg:col-span-1">
                        <ProjectStatusPieChart />
                    </div>
                    <div className="w-full lg:col-span-2">
                         <PerformanceRadarChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsPage;
