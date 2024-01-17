import React from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import style from './../../public/css/setting.module.css';
import toggle from './toggle';

function Setting({ icon, detail, name }) { 
    return (
        <div className={style.body}>
            <h1 className={style.functName}>
               {icon}&nbsp;&nbsp; {name}: 
            </h1>
            <p className={style.detail}> {detail} </p> <toggle />
        </div>
    );
}

export default Setting;
