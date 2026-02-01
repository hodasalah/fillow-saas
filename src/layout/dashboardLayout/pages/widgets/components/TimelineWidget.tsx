import React from 'react';

const activities = [
    {
        id: 1,
        time: '10:30 AM',
        title: 'New Project Created',
        desc: 'Build a new SaaS dashboard for client.',
        color: 'bg-purple-500' // Using tailwind/theme colors
    },
    {
        id: 2,
        time: '11:00 AM',
        title: 'Meeting with Team',
        desc: 'Discussing the roadmap for Q4.',
        color: 'bg-blue-500'
    },
    {
        id: 3,
        time: '01:15 PM',
        title: 'Client Feedback',
        desc: 'Received feedback on the homepage design.',
        color: 'bg-pink-500'
    },
    {
        id: 4,
        time: '03:45 PM',
        title: 'Server Maintenance',
        desc: 'Scheduled downtime for upgrades.',
        color: 'bg-yellow-500'
    }
];

const TimelineWidget: React.FC = () => {
    return (
        <div className="card-dynamic-bg p-6 rounded-2xl shadow-sm h-full">
            <h3 className="text-lg font-bold text-[var(--text-dark)] mb-6">Recent Activity</h3>
            <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-3 space-y-8">
                {activities.map((activity) => (
                    <div key={activity.id} className="relative pl-8">
                        <span 
                            className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${activity.color}`}
                        ></span>
                        <div>
                             <span className="text-xs text-gray-400 font-medium block mb-1">{activity.time}</span>
                             <h4 className="text-sm font-bold text-[var(--text-dark)]">{activity.title}</h4>
                             <p className="text-xs text-gray-500 mt-1">{activity.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineWidget;
