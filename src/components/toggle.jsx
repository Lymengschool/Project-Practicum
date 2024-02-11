import React, { useState } from 'react';
import style from './../../public/css/toggle.module.css';

function Toggle({ functName, setIsNoTimer, setlightMode, setAccu100 }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(prevState => !prevState); 
        if (functName === 'NoTimer') {
            setIsNoTimer(prevState => !prevState);
            sessionStorage.setItem('isNoTimer', JSON.stringify(!isChecked));
        } else if (functName === 'lightMode') {
            setlightMode(prevState => !prevState);
            sessionStorage.setItem('islightMode', JSON.stringify(!isChecked));
        } else {
            setAccu100(prevState => !prevState);
            sessionStorage.setItem('isAccu100', JSON.stringify(!isChecked));
        }
    };

    return (
        <label className={style.toggleBtn}>
            <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
            <span className={`${style.toggleSlider} ${isChecked ? style.active : ''}`}/>
        </label>
    );
}

export default Toggle;
