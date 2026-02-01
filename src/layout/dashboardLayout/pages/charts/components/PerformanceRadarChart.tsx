import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PerformanceRadarChart: React.FC = () => {
    const [series] = useState([
        {
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
        },
        {
            name: 'Series 2',
            data: [20, 30, 40, 80, 20, 80],
        },
        {
            name: 'Series 3',
            data: [44, 76, 78, 13, 43, 10],
        },
    ]);

    const [options] = useState<ApexOptions>({
        chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1,
            },
            toolbar: {
                show: false
            },
            fontFamily: 'Inter, sans-serif',
        },
        stroke: {
            width: 2,
        },
        fill: {
            opacity: 0.1,
        },
        markers: {
            size: 0,
        },
        yaxis: {
            stepSize: 20,
        },
        xaxis: {
            categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
             labels: {
                style: {
                     colors: ['#64748b', '#64748b', '#64748b', '#64748b', '#64748b', '#64748b'],
                }
            }
        },
        colors: ['#886cc0', '#2dd4bf', '#ffa7d7'],
        tooltip: {
            theme: 'dark'
        },
        legend: {
            position: 'top',
        }
    });

    return (
        <div className="card-dynamic-bg p-6 rounded-2xl shadow-sm h-full w-full">
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="text-lg font-bold text-[var(--text-dark)]">Performance Metrics</h3>
                    <p className="text-sm text-gray-400">Multi-year comparison</p>
                </div>
            </div>
            <div id="chart" className="flex justify-center">
                <ReactApexChart options={options} series={series} type="radar" height={350} width="100%" />
            </div>
        </div>
    );
};

export default PerformanceRadarChart;
