import React from 'react';

interface DataSourceIndicatorProps {
    source?: 'Firebase' | 'Mock';
}

const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({ source = 'Unknown' }) => {
    // We can also infer from store if needed, but prop is cleaner for now
    const isFirebase = source === 'Firebase';
    
    return (
        <div className={`fixed bottom-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-50 flex items-center gap-2 ${
            isFirebase ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
        }`}>
            <div className={`w-2 h-2 rounded-full ${isFirebase ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span>Data Source: {source}</span>
        </div>
    );
};

export default DataSourceIndicator;
