import React, {useRef, useEffect} from 'react';
import Nav from "../components/nav.jsx";
import style from "./../../public/css/result.module.css"
import Chart from 'chart.js/auto';
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function Result({ isAccu100 }) {
    const navigate = useNavigate();
    const chartRef = useRef(null);

    const generateData = (count) => {
        const data = [];
        for (let i = 0; i < count; i++) {
          data.push(i * 5);
        }
        return data;
    };
    
    const restart = () => {
      navigate("/");
    }

    useEffect(() => {
        // Your Chart.js configuration
        const config = {
            type: 'line',
            data: {
                labels: Array.from({ length: 30 }, (_, i) => i + 1),
                datasets: [{
                    label: 'My First Dataset',
                    data: generateData(5),
                    fill: false,
                    borderColor: ' #007ACC',
                    tension: 0.1,
                }],
            },
        };

        // Create the chart
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, config);

        // Cleanup on component unmount
        return () => myChart.destroy();
    }, []); 

    return (
        <div>
            <Nav/>
            <div className={style.container}>
                <div className={style.block}>
                    <p className={style.word}>ពាក្យក្នុង​​.វ</p>
                    <p className={style.num}>30</p>
                </div>
                <div className={style.block}>
                    <p className={style.word}>អក្សរក្នុង​​.វ</p>
                    <p className={style.num}>210</p>
                </div>
                <div className={style.block}>
                    <p className={style.word}>ភាពត្រឹមត្រូវ</p>
                    <p className={style.numW}>90%</p>
                </div>
                <div className={style.block}>
                    <p className={style.word}>រយ:ពេល</p>
                    <p className={style.numW}>100s</p>
                </div>
            </div>
            {/* Add a canvas element for the chart */}
            <div className={style.chartContainer}>
                <canvas ref={chartRef}></canvas>
            </div >
            <div className={style.restartContainer}>
                <button onClick={() => restart()} className={style.restart}> <VscDebugRestart /> </button>
            </div>
        </div>
    );
}

export default Result;
