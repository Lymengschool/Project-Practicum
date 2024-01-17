import React from 'react';
import style from './../../public/css/toggle.module.css'

function Toggle() { // Change the function name to use PascalCase


    const toggleSlider = () => {    
          updateSlider();
      }
    const  toggleButton = () => {
        const toggleButton = document.querySelector('.toggle_button');
        toggleButton.classList.toggle('active');
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
        <div className={style.toggleContainer}>
        <label className={style.toggleBtn}>
            <input type="checkbox" onchange={toggleSlider} />
            <span className={style.toggleSlider}></span>
        </label>
    </div>
    );
}

export default Toggle;







