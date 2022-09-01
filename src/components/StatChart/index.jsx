import React from "react";

import ReactApexChart from "react-apexcharts";

const series = [
    {
        // name: ["Имена для колонок"],
        data: [4, 4, 4, 4, 4, 4, 4],
    },
];

const options = {
    chart: {
        width: "100%",
        height: 210,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: "25%",
            distributed: true,
        },
    },
    colors: ['#2081e2'],
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    xaxis: {
        categories: ["3/7", "3/10", "3/13", "3/16", "3/19", "3/22", "3/26"],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        labels: {
            style: {
                colors: "#fff",
                fontFamily: "Gilroy, sans-serif",
                fontSize: "12px"
            }
        }
    },
    yaxis: {
        min: 0,
        max: 10,
        tickAmount: 2,
        labels: {
            style: {
                colors: "#fff",
                fontFamily: "Gilroy, sans-serif",
                fontSize: "12px"
            }
        }
    },
};

const StatChart = () => {
    return (
        <div className="stats__chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={210}
            />
        </div>
    );
};

export default StatChart;
