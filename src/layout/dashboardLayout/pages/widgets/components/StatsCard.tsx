import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: IconDefinition;
    color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendUp, icon, color }) => {
    return (
        <div className="card-dynamic-bg p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-[var(--text-dark)]">{value}</h3>
                </div>
                <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: color }}
                >
                    <FontAwesomeIcon icon={icon} className="text-xl" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium">
                <span className={`${trendUp ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {trendUp ? '▲' : '▼'} {trend}
                </span>
                <span className="text-gray-400 ml-2">since last month</span>
            </div>
        </div>
    );
};

export default StatsCard;
