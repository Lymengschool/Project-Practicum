import React, { useState } from 'react';
import style from './../../public/css/toggle.module.css'

function Toggle() {

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    }

    return (
        <label className={style.togglebutton}>
            <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
            <span className={`${style.slider} ${isChecked ? style.active : ''}`}/>
        </label>
    );
}

export default Toggle;