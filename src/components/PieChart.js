import React, {useEffect, useState} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    // animation: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'User User debts',
        }
    }
}
const getGPA = (array) =>{
    const result = [0, 0, 0, 0];
    for (const arrayElement of array) {
        result[arrayElement.mark - 2] += 1;
    }
    return result;
}

export function PieChart() {

    const [data, setData] = useState(null);


    async function fetchData(){
        const response = await axios.create({
            baseURL: "https://students-retake-back.onrender.com/api/student/get-performance",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('JwtToken')}`
            }
        }).get();
        const array = response.data;
        const marksData = getGPA(array);
        const chartData = {
            labels: ['2', '3', '4', '5'],
            datasets: [
                {
                    label: 'My statistics',
                    data: marksData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',

                        'rgba(189,141,52,0.2)',
                        'rgba(99,255,237,0.2)',
                        'rgba(129,204,68,0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',

                        'rgba(189,141,52, 1)',
                        'rgba(99,255,237,1)',
                        'rgba(129,204,68,1)'
                    ],
                    borderWidth: 1,
                },
            ],
        }
        setData(chartData);
    }

    useEffect(() =>{
        fetchData();
    }, []);


    return (

        data ? (<Pie data={data} style={{
            width: '100%',
            height: '100%'
        }} options={options}/>) : (
            ""
        )
    );
}