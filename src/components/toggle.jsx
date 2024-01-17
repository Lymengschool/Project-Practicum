import React from 'react';
import style from './../../public/css/toggle.module.css'

function toggle() { // Change the function name to use PascalCase

    const  toggleButton = () => {
        const toggleButton = document.querySelector('.toggle-button');
        toggleButton.classList.toggle('active');
      }

    return (
        <div className={style.toggle-button} onclick="toggleButton()">
            <div>Toggle</div>
            <div>Button</div>
        </div>
    );
}

export default toggle;







