import React, { useState } from "react";
import style from "./../../public/css/toggle.module.css";

function Toggle({ isChecked, handleToggle }) {
    return (
        <label className={style.toggleBtn}>
            <input type='checkbox' checked={isChecked} onChange={handleToggle} />
            <span className={`${style.toggleSlider} ${isChecked ? style.active : ""}`} />
        </label>
    );
}

export default Toggle;
