import React, { useState } from 'react';
import style from './../../public/css/toggle.module.css'

function Toggle() {

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    }


    const updateSlider = () => {
        var checkbox = document.querySelector('.toggle-btn input');
        var slider = document.querySelector('.toggle-btn .toggle-slider');
    
        if (checkbox.checked) {
            slider.style.transform = 'translateX(30px)';
            slider.style.backgroundColor = '#ffff00';
        } else {
            slider.style.transform = 'translateX(0)';
            slider.style.backgroundColor = '#fff';
        }
    
    }

    return (
        <label className={style.togglebutton}>
            <input type="checkbox" checked={isChecked} onChange={handleToggle}/>
            <span className={`${style.slider} ${isChecked ? style.active : ''}`}/>
        </label>
    );
}

export default Toggle;