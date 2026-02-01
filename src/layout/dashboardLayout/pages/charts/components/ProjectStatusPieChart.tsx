import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProjectStatusPieChart: React.FC = () => {
    const [series] = useState([44, 55, 13, 43]);

    const [options] = useState<ApexOptions>({
        chart: {
            width: 380,
            type: 'pie',
            fontFamily: 'Inter, sans-serif',
        },
        labels: ['Completed', 'In Progress', 'On Hold', 'Planned'],
        colors: ['#2dd4bf', '#886cc0', '#f43f5e', '#fbbf24'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
        stroke: {
            show: false,
        },
        dataLabels: {
             dropShadow: {
                 enabled: false
             },
             style: {
                 fontSize: '14px',
                 fontFamily: 'Inter, sans-serif',
                 fontWeight: 500,
             }
        },
        tooltip: {
          theme: 'dark',
        },
        legend: {
             position: 'bottom',
             formatter: function(seriesName, opts) {
                return seriesName + " - " + opts.w.globals.series[opts.seriesIndex]
             }
        }
    });

    return (
        <div className="card-dynamic-bg p-6 rounded-2xl shadow-sm h-full w-full flex flex-col items-center justify-center">
             <div className="w-full text-left mb-4">
                 <h3 className="text-lg font-bold text-[var(--text-dark)]">Project Distribution</h3>
                 <p className="text-sm text-gray-400">Overview of all project statuses</p>
            </div>
            <div id="chart" className="py-4">
                <ReactApexChart options={options} series={series} type="pie" width={380} />
            </div>
        </div>
    );
};

export default ProjectStatusPieChart;
