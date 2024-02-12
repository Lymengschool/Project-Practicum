import React, { useState } from "react";
import style from "./../../public/css/toggle.module.css";

function Toggle({ functName, setIsNoTimer, setlightMode, setAccu100 }) {
    const islightMode = JSON.parse(localStorage.getItem("islightMode")) || false;
    const [isChecked, setIsChecked] = useState(() => {
        if (functName === "NoTimer") {
            return JSON.parse(localStorage.getItem("isNoTimer")) || false;
        } else if (functName === "lightMode") {
            
            return JSON.parse(localStorage.getItem("islightMode")) || false;

        } else {
            return JSON.parse(localStorage.getItem("isAccu100")) || false;
        }
    });

    const handleToggle = () => {
        setIsChecked((prevState) => !prevState);
        if (functName === "NoTimer") {
            setIsNoTimer((prevState) => !prevState);
            sessionStorage.setItem("isNoTimer", JSON.stringify(!isChecked));
        } else if (functName === "lightMode") {
            setlightMode((prevState) => !prevState);
            sessionStorage.setItem("islightMode", JSON.stringify(!isChecked));
            
        } else {
            setAccu100((prevState) => !prevState);
            sessionStorage.setItem("isAccu100", JSON.stringify(!isChecked));
        }

        if (!islightMode) {
            document.documentElement.style.setProperty('--head', '#1E107A'); 
            document.documentElement.style.setProperty('--focus', '#55C6F0'); 
            document.documentElement.style.setProperty('--word', '#1D1E1E'); 
            document.documentElement.style.setProperty('--subback', '#E5DDD4'); 
            document.documentElement.style.setProperty('--hover', '#1b2028'); 
            document.documentElement.style.setProperty('--background', '#FFF9F2');
        } else {
            document.documentElement.style.setProperty('--head', '#1e90ff');
            document.documentElement.style.setProperty('--focus', '#1e90ff');
            document.documentElement.style.setProperty('--word', '#4B5975');
            document.documentElement.style.setProperty('--subback', '#151a21');
            document.documentElement.style.setProperty('--hover', '#dfdfdf');
            document.documentElement.style.setProperty('--background', '#1b2028');
        }
    };

    return (
        <label className={style.toggleBtn}>
            <input type='checkbox' checked={isChecked} onChange={handleToggle} />
            <span className={`${style.toggleSlider} ${isChecked ? style.active : ""}`} />
        </label>
    );
}

export default Toggle;
