import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RevenueAreaChart: React.FC = () => {
    const [series] = useState([
        {
            name: 'Revenue',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Expenses',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ]);

    const [options] = useState<ApexOptions>({
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false,
            },
            fontFamily: 'Inter, sans-serif',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00.000Z',
                '2018-09-19T01:30:00.000Z',
                '2018-09-19T02:30:00.000Z',
                '2018-09-19T03:30:00.000Z',
                '2018-09-19T04:30:00.000Z',
                '2018-09-19T05:30:00.000Z',
                '2018-09-19T06:30:00.000Z',
            ],
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
            labels: {
                style: {
                     colors: '#64748b',
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        colors: ['#886cc0', '#ffa7d7'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
        grid: {
            show: true,
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            } 
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
                    <h3 className="text-lg font-bold text-[var(--text-dark)]">Total Revenue</h3>
                    <p className="text-sm text-gray-400">Monthly financial overview</p>
                </div>
            </div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
        </div>
    );
};

export default RevenueAreaChart;
