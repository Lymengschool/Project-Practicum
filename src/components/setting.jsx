import React from "react";
import style from "./../../public/css/setting.module.css";

function Setting({ icon, detail, name}) {
    // Change the function name to use PascalCase
    return (
        <div className={style.body}>
            <div className={style.info}>
                <h1 className={style.functName}>
                    {icon}&nbsp;&nbsp; {name}:
                </h1>
                <p className={style.detail}> {detail} </p>
            </div>
           
        </div>
    );
}

export default Setting;
