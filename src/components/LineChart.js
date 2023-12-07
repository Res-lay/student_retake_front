import React, {useEffect, useState} from "react";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import axios from "axios";

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

function LineChart(role) {

    const [data, setData] = useState(null);

    async function getDebts() {
        try {
            const response = await axios.create({
                baseURL: "https://students-retake-91s0.onrender.com/api/student/get-debts",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
                }
            }).get();
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    function getLabels(response) {
        const labels = [];
        for (let i = 1; i <= response[0].student.term; i++) {
            labels.push(`${i} Term`);
        }
        return labels;
    }

    function getData(response) {
        const data = new Array(response[0].student.term).fill(0);
        for (const retake of response) {
            console.log(data.term);
            data[retake.term - 1] += 1;
        }

        return data;
    }

    async function fetchData() {
        const response = await getDebts();
        if (Array.isArray(response) && response.length > 0) {
            const labels = getLabels(response);
            const dataValues = getData(response);


            const chartData = {
                labels,
                datasets: [
                    {
                        label: 'Number of debts',
                        data: dataValues,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension: 0.4
                    },
                ],
            };

            setData(chartData);
        }else{

        }
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        data ? (

            <Line style={{
                width: '100%',
                height: '100%'
            }} data={data} options={options}></Line>

        ) : (
            ""
        )
    )
}

export default LineChart;