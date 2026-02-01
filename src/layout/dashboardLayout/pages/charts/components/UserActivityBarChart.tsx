import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const UserActivityBarChart: React.FC = () => {
    const [series] = useState([
        {
            name: 'Active Users',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'New Signups',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        }, 
    ]);

    const [options] = useState<ApexOptions>({
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
            fontFamily: 'Inter, sans-serif',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
                style: {
                     colors: '#64748b',
                }
            },
            axisBorder: {
               show: false
            },
            axisTicks: {
               show: false
            }
        },
        yaxis: {
            title: {
                text: 'Users (thousands)',
                 style: {
                     color: '#64748b',
                }
            },
             labels: {
                style: {
                     colors: '#64748b',
                }
            }
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + ' thousands';
                },
            },
            theme: 'dark'
        },
        colors: ['#886cc0', '#2dd4bf'],
        grid: {
             show: true,
             borderColor: '#f1f5f9',
             strokeDashArray: 4,
        },
        legend: {
            position: 'top',
             horizontalAlign: 'right',
        }
    });

    return (
        <div className="card-dynamic-bg p-6 rounded-2xl shadow-sm h-full w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                     <h3 className="text-lg font-bold text-[var(--text-dark)]">User Activity</h3>
                     <p className="text-sm text-gray-400">Active users vs New signups</p>
                </div>
            </div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    );
};

export default UserActivityBarChart;
