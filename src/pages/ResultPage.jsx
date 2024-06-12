import React, { useRef, useEffect, useState } from 'react';
import Nav from "../components/nav.jsx";
import style from "./../../public/css/result.module.css";
import Chart from 'chart.js/auto';
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { auth, database, ref, push } from '../components/firebase.jsx';

function Result() {
    const navigate = useNavigate();
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const dataPushedRef = useRef(false); // Track if data is pushed

    const generateData = (count) => {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push(i * 5);
        }
        return data;
    };

    const restart = () => {
        localStorage.setItem('wpm', '0');
        localStorage.setItem('cpm', '0');
        navigate("/");
    }

    useEffect(() => {
        const wpm = parseFloat(localStorage.getItem('wpm')) || 0;
        const cpm = parseFloat(localStorage.getItem('cpm')) || 0;
        const isLogin = localStorage.getItem('isLogin') === 'true';
        const accuracy = parseFloat(localStorage.getItem('accuracy') || 0);
        const timeTaken = parseFloat(localStorage.getItem('timeTaken') || 0);

        // Update chart data
        const newData = generateData(wpm); // Use wpm for demo, replace with actual data
        setChartData(newData);

        // Ensure all values are finite numbers
        if (isFinite(wpm) && isFinite(cpm) && isFinite(accuracy)) {
            if (isLogin && !dataPushedRef.current) { // Check if data is already pushed
                const user = auth.currentUser;
                
                if (user) {
                    const userStatsRef = ref(database, `users/${user.uid}/typingStats`);
                    push(userStatsRef, {
                        timeTaken,
                        accuracy,
                        wpm,
                        cpm,
                        timestamp: Date.now()
                    }).then(() => {
                        console.log("WPM and CPM successfully saved.");
                        dataPushedRef.current = true; // Mark as pushed
                    }).catch((error) => {
                        console.error("Error saving WPM and CPM:", error);
                    });
                }
            }
        } else {
            console.error('Invalid data: ', { wpm, cpm, accuracy });
        }

        // Your Chart.js configuration
        const config = {
            type: 'line',
            data: {
                labels: Array.from({ length: 30 }, (_, i) => i + 1),
                datasets: [{
                    label: 'WPM',
                    data: newData,
                    fill: false,
                    borderColor: '#007ACC',
                    tension: 0.1,
                }],
            },
        };

        // Create the chart
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, config);

        // Cleanup on component unmount
        return () => myChart.destroy();
    }, []); // Empty dependency array to ensure it runs once on mount

    return (
        <div>
            <Nav />
            <div className={style.container}>
                <div className={style.block}>
                    <p className={style.word}>ពាក្យក្នុង​​.វ</p>
                    <p className={style.num}>{localStorage.getItem('wpm') || 0}</p>
                </div>
                <div className={style.block}>
                    <p className={style.word}>អក្សរក្នុង​​.វ</p>
                    <p className={style.num}>{localStorage.getItem('cpm') || 0}</p>
                </div>
                <div className={style.block}>
                    <p className={style.word}>ភាពត្រឹមត្រូវ</p>
                    <p className={style.numW}>{localStorage.getItem('accuracy') || 0}</p>
                </div>
                <div className={style.block}>
                    <p className={style.word}>រយ:ពេល</p>
                    <p className={style.numW}>{localStorage.getItem('timeTaken') || 0}</p>
                </div>
            </div>
            {/* Add a canvas element for the chart */}
            <div className={style.chartContainer}>
                <canvas ref={chartRef}></canvas>
            </div>
            <div className={style.restartContainer}>
                <button onClick={() => restart()} className={style.restart}> <VscDebugRestart /> </button>
            </div>
        </div>
    );
}

export default Result;
