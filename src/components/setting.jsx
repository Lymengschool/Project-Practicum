import React from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import style from './../../public/css/setting.module.css';
import Footer from './footer';

function Setting({ icon, detail, name }) { // Change the function name to use PascalCase
    return (
        <div className={style.body}>
            <h1 className={style.functName}>
               {icon}&nbsp;&nbsp; {name}:
            </h1>
            <p className={style.detail}> {detail} </p>
        </div>
    );
}

export default Setting;
