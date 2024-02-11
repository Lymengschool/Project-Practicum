import React, { useState } from 'react';
import style from './../../public/css/toggle.module.css';

function Toggle({ functName, setIsNoTimer, setlightMode, setAccu100 }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(prevState => !prevState); 
        if (functName === 'NoTimer') {
            setIsNoTimer(prevState => !prevState);
        } else if (functName === 'lightMode') {
            setlightMode(prevState => !prevState);
        } else {
            setAccu100(prevState => !prevState);
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
