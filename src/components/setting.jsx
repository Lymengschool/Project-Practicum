import React from "react";
import { FaEyeSlash } from "react-icons/fa";
import style from "./../../public/css/setting.module.css";

function Setting({ icon, detail, name, fun }) {
    // Change the function name to use PascalCase
    return (
        <div className={style.body}>
            <div className={style.info}>
                <h1 className={style.functName}>
                    {icon}&nbsp;&nbsp; {name}:
                </h1>
                <p className={style.detail}> {detail} </p>
            </div>
            {fun}
        </div>
    );
}

export default Setting;
