import { faCloudSun, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const WeatherWidget: React.FC = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl shadow-sm h-full text-white bg-gradient-to-br from-blue-400 to-blue-600">
             {/* Dynamic background circles */}
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 rounded-full bg-white opacity-10"></div>
            
            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-lg font-semibold flex items-center">
                            <FontAwesomeIcon icon={faLocationDot} className="mr-2 opacity-80" />
                            New York
                        </h4>
                        <p className="text-sm opacity-80 mt-1">Mon, 12 Aug</p>
                    </div>
                    <FontAwesomeIcon icon={faCloudSun} className="text-4xl opacity-90" />
                </div>
                
                <div className="mt-6">
                    <h2 className="text-5xl font-bold">28°</h2>
                    <p className="text-sm font-medium mt-1 opacity-90">Partly Cloudy</p>
                </div>

                <div className="mt-6 flex justify-between text-xs opacity-80 border-t border-white/20 pt-4">
                     <div className="text-center">
                        <span className="block font-bold">12 km/h</span>
                        <span>Wind</span>
                     </div>
                     <div className="text-center">
                        <span className="block font-bold">48%</span>
                        <span>Humidity</span>
                     </div>
                     <div className="text-center">
                        <span className="block font-bold">100%</span>
                        <span>Chance</span>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
